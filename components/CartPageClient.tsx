'use client';

import { useState } from "react";
import { ChevronLeft, Trash2, ShoppingCart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";
import { CartItem } from "@/types";
import { syncCart } from "@/lib/api/cart";

interface CartPageClientProps {
  initialItems: CartItem[];
  orderId: number;
  minOrderValue: number;
}

export default function CartPageClient({ initialItems, orderId, minOrderValue }: CartPageClientProps) {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [isSaving, setIsSaving] = useState(false);

  // Cálculos locais (instantâneos)
  const total = items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);
  const isMinOrderReached = total >= minOrderValue;

  // Handlers locais
  const handleUpdateQuantity = (productId: number, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.product_id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty, subtotal: newQty * item.unit_price };
      }
      return item;
    }));
  };

  const handleRemove = (productId: number) => {
    if (confirm("Remover este item do carrinho?")) {
      setItems(prev => prev.filter(item => item.product_id !== productId));
    }
  };

  const handleClearCart = () => {
    if (confirm("Deseja limpar todo o carrinho?")) {
      setItems([]);
    }
  };

  // Sincronização com o Backend ao avançar
  const handleConfirm = async () => {
    if (!isMinOrderReached) return;
    
    setIsSaving(true);
    try {
      // Prepara o payload para o RPC
      const payload = items.map(i => ({
        product_id: i.product_id,
        quantity: i.quantity
      }));

      await syncCart(orderId, payload);
      
      // Navega para a próxima tela (Endereço)
      router.push('/checkout/address'); 
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar carrinho. Tente novamente.");
      setIsSaving(false);
    }
  };

  return (
    // Aumentei o pb-48 para pb-64 para garantir espaço extra no final da rolagem
    <div className="min-h-screen bg-gray-50 font-sans pb-64">
      {/* Header */}
      <div className="bg-cyan-500 px-4 pt-4 pb-16 relative">
        <div className="flex items-center justify-between text-white">
          <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="font-bold text-sm">{items.length}</span>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-6 left-4 right-4 bg-white rounded-xl shadow-lg p-4 flex justify-between items-center">
          <h1 className="font-bold text-gray-800 text-lg">Itens de compra</h1>
          {items.length > 0 && (
            <button 
              onClick={handleClearCart}
              className="text-xs text-red-500 font-medium flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded transition-colors"
            >
              Limpar lista <Trash2 size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Lista de Itens */}
      <div className="px-4 mt-10 flex flex-col gap-3">
        {items.length > 0 ? (
          items.map(item => (
            <CartItemCard 
              key={item.product_id} 
              item={item} 
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <ShoppingCart size={48} className="mb-4 opacity-50" />
            <p>Seu carrinho está vazio.</p>
          </div>
        )}
      </div>

      {/* Summary e Ação */}
      {/* Ajuste importante: mb-20 para o CartSummary não colar no rodapé da página e colidir com a navegação */}
      <div className="pb-20">
        <CartSummary total={total} minOrderValue={minOrderValue} />
      </div>
      
      {/* Botão Flutuante de Confirmação */}
      {/* Ajuste de Z-Index para 60 (maior que o navigation z-50) e bottom elevado para não ser coberto */}
      <div className="fixed bottom-24 left-4 right-4 z-[60]">
        {items.length > 0 && (
          <button
            onClick={handleConfirm}
            disabled={!isMinOrderReached || isSaving}
            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
              isMinOrderReached && !isSaving
                ? 'bg-cyan-600 hover:bg-cyan-700 active:scale-[0.98] shadow-cyan-600/30' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isSaving && <Loader2 size={18} className="animate-spin" />}
            {isSaving ? 'Salvando...' : 'CONFIRMAR ENDEREÇO'}
          </button>
        )}
      </div>
    </div>
  );
}