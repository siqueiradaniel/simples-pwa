'use server';

import { supabaseServer } from '../supabase/server';
import { OrderWithUser } from '@/types';

export async function getOrdersWithUsers(branchId: number) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .rpc('get_orders_with_users', { bid: branchId });

  if (error) {
    console.error('getOrdersWithUsers error:', error);
    throw new Error('Failed to load orders for branch');
  }

  return data as OrderWithUser[];
}