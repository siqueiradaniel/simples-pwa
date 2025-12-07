import { supabaseServer } from '../supabase/server';
import { CartItem, CartItemInput } from '@/types';

// Obtém o ID do pedido 'CURRENT' (cria se não existir)
export async function getOrCreateCartId(userId: number, branchId: number) {
  const supabase = supabaseServer();
  
  const { data, error } = await supabase
    .rpc('get_or_create_current_order', { user_id_input: userId, branch_id_input: branchId });

  if (error) throw new Error(error.message);
  return data as number;
}

// Carrega os itens do carrinho atual
export async function getCartItems(orderId: number) {
  const supabase = supabaseServer();

  // Reusando a view de itens que já criamos para Orders
  const { data, error } = await supabase
    .rpc('get_order_items_by_id', { order_id_input: orderId });

  if (error) {
    console.error('getCartItems error:', error);
    return [];
  }

  // Mapeia para o tipo CartItem amigável
  return (data as any[]).map(item => ({
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    name: item.product_name,
    image_url: item.product_image,
    unit: item.product_unit,
    subtotal: item.subtotal
  })) as CartItem[];
}

// Salva as alterações do carrinho (Sync)
export async function syncCart(orderId: number, items: CartItemInput[]) {
  const supabase = supabaseServer();

  // Transforma o array de objetos em formato que o Postgres aceita (array de composite types)
  // O Supabase JS client lida bem com JSON, mas para RPC com tipos customizados, passar como JSONB é mais seguro
  // Mas como definimos o tipo no banco, vamos tentar passar direto. Se falhar, mudamos para JSON.
  
  const { error } = await supabase
    .rpc('sync_cart', { 
      order_id_input: orderId, 
      items_input: items 
    });

  if (error) throw new Error(error.message);
}