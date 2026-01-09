'use server';

import { supabaseServer } from '../supabase/server';
import { OrderDetails, OrderItem } from '@/types';

export async function getOrderDetails(orderId: number) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .rpc('get_order_details_by_id', { order_id_input: orderId })
    .single();

  if (error) {
    console.error('[getOrderDetails] Error:', error);
    return null;
  }

  return data as OrderDetails;
}

export async function getOrderItems(orderId: number) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .rpc('get_order_items_by_id', { order_id_input: orderId });

  if (error) {
    console.error('[getOrderItems] Error:', error);
    return [];
  }

  return data as OrderItem[];
}