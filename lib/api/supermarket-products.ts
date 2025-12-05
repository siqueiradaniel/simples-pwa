import { supabaseServer } from '../supabase/server';
import { AdminProduct } from '@/types';

export async function getSupermarketProducts(chainId: number) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .rpc('get_supermarket_products', { chain_id_input: chainId });

  if (error) {
    console.error('getSupermarketProducts error:', error);
    throw new Error('Failed to load supermarket products');
  }

  return data as AdminProduct[];
}