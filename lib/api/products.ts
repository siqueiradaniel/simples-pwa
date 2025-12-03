import { supabaseServer } from '../supabase/server';

export async function getProductsForBranch(branchId: number) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .rpc('get_products_for_branch', { bid: branchId });

  if (error) {
    console.error('getProductsForBranch error:', error);
    throw new Error('Failed to load products for branch');
  }

  return data;
}
