import { create } from 'zustand';
import { createSupabaseClient } from '@/lib/supabase/client';
import { updateCartItem, getOrCreateCartId, getCartItems } from '@/lib/api/cart';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  orderId: number | null;
  isLoading: boolean;
  
  // Actions
  initializeCart: (userId: number, branchId: number) => Promise<void>;
  addItem: (product: any) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  updateItemQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => void; // Reset local (útil para logout)
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  orderId: null,
  isLoading: false,

  initializeCart: async (userId: number, branchId: number) => {
    // Evita inicializar se já estiver carregado ou carregando
    if (get().orderId || get().isLoading) return;

    set({ isLoading: true });
    try {
      const orderId = await getOrCreateCartId(userId, branchId);
      const items = await getCartItems(orderId);
      set({ orderId, items });
    } catch (error) {
      console.error("Erro ao inicializar carrinho:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (product) => {
    const { items, updateItemQuantity } = get();
    // Identifica o ID corretamente (compatibilidade com diferentes views)
    const productId = product.product_id || product.id;
    
    const existingItem = items.find(i => i.product_id === productId);
    const currentQty = existingItem ? existingItem.quantity : 0;

    // Se não existe, precisamos passar os dados do produto para criar o objeto otimista
    if (!existingItem) {
      // Chama o update com a nova quantidade (1). A lógica de criar o objeto otimista
      // será tratada dentro de updateItemQuantity se passarmos o produto
      // Mas para simplificar a assinatura, vamos tratar aqui ou passar productData
      // Vamos manter a lógica centralizada no updateItemQuantity, mas precisamos passar o produto
      // Como a assinatura da interface define updateItemQuantity(id, qty), vamos fazer a lógica aqui mesmo para novos itens
      
      const newItem: CartItem = {
        product_id: productId,
        quantity: 1,
        unit_price: product.sell_price,
        name: product.name,
        image_url: product.image_url,
        unit: product.unit,
        subtotal: product.sell_price
      };
      
      // Optimistic Update
      set({ items: [...items, newItem] });
      
      // Sync
      const { orderId } = get();
      if (orderId) {
        try {
          await updateCartItem(orderId, productId, 1);
        } catch (error) {
          console.error(error);
          set({ items }); // Reverte
        }
      }
    } else {
      await updateItemQuantity(productId, currentQty + 1);
    }
  },

  removeItem: async (productId) => {
    const { items, updateItemQuantity } = get();
    const existingItem = items.find(i => i.product_id === productId);
    
    if (existingItem && existingItem.quantity > 0) {
      await updateItemQuantity(productId, existingItem.quantity - 1);
    }
  },

  updateItemQuantity: async (productId, quantity) => {
    const { items, orderId } = get();
    if (!orderId) return;

    // Snapshot para rollback
    const previousItems = [...items];

    // Optimistic UI Update
    set(state => {
      if (quantity <= 0) {
        return { items: state.items.filter(i => i.product_id !== productId) };
      }
      return {
        items: state.items.map(i => 
          i.product_id === productId 
            ? { ...i, quantity, subtotal: quantity * i.unit_price }
            : i
        )
      };
    });

    // Server Sync
    try {
      await updateCartItem(orderId, productId, quantity);
    } catch (error) {
      console.error("Erro ao sincronizar item:", error);
      set({ items: previousItems }); // Rollback em caso de erro
      alert("Erro ao atualizar carrinho. Verifique sua conexão.");
    }
  },

  clearCart: () => set({ items: [], orderId: null })
}));