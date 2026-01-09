'use server'

import { supabaseServer } from '../supabase/server';
import { UIProduct } from '@/types';

export async function getProductsForBranch(branchId: number) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .rpc('get_products_for_branch', { bid: branchId });

  if (error) {
    console.error('[getProductsForBranch] Error:', error);
    throw new Error('Failed to load products for branch');
  }

  return data as UIProduct[];
}