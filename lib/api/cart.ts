'use server';

import { supabaseServer } from '../supabase/server';
import { createSupabaseClient } from '../supabase/client'; 
import { CartItem, CartItemInput } from '@/types';
import { revalidatePath } from 'next/cache';

// ==========================================
// CART MANAGEMENT (CURRENT ORDER)
// ==========================================

// Get current cart ID or create a new one
export async function getOrCreateCartId(userId: string, branchId: number) {
  const supabase = await supabaseServer();
  
  const { data, error } = await supabase
    .rpc('get_or_create_current_order', { 
      user_id_input: userId, 
      branch_id_input: branchId 
    });

  if (error) {
    console.error('[getOrCreateCartId] Error:', error.message);
    throw new Error(error.message);
  }
  return data as number;
}

// Get items for a specific cart/order
export async function getCartItems(orderId: number) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .rpc('get_order_items_by_id', { order_id_input: orderId });

  if (error) {
    console.error('[getCartItems] Error:', error);
    return [];
  }

  // Map RPC result to CartItem type
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

// Sync entire cart (Bulk Update)
export async function syncCart(orderId: number, items: CartItemInput[]) {
  const supabase = await supabaseServer();

  const { error } = await supabase
    .rpc('sync_cart', { 
      order_id_input: orderId, 
      items_input: items 
    });

  if (error) throw new Error(error.message);

  revalidatePath('/cart');
}

// Update single item (Client-friendly)
export async function updateCartItem(orderId: number, productId: number, quantity: number) {
  // Use client-side client for immediate interactions
  const supabase = createSupabaseClient();

  const { error } = await supabase
    .rpc('update_cart_item_quantity', { 
      order_id_input: orderId,
      product_id_input: productId,
      quantity_input: quantity
    });

  if (error) {
    console.error('[updateCartItem] Error:', error);
    throw new Error('Failed to update item');
  }

  revalidatePath('/cart');
}

// ==========================================
// ORDER DETAILS
// ==========================================

// Update delivery address
export async function updateOrderAddress(orderId: number, addressId: number) {
  const supabase = await supabaseServer();

  const { error } = await supabase
    .from('orders')
    .update({ address_id: addressId })
    .eq('id', orderId);

  if (error) {
    console.error('[updateOrderAddress] Error:', error);
    throw new Error('Failed to update order address');
  }

  revalidatePath('/cart');     
  revalidatePath('/checkout/address');
}

// Get basic order info (Total, Fees)
export async function getCurrentOrder(orderId: number) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('orders')
    .select('id, total_price, delivery_fee, discount')
    .eq('id', orderId)
    .single();

  if (error) {
    console.error('[getCurrentOrder] Error:', error);
    return null;
  }

  return data;
}