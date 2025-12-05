import { supabaseServer } from '../supabase/server';
import { SupermarketWithBranch } from '@/types';

export async function getSupermarketChain(chainId: number) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .rpc('get_supermarket_with_filials', { chain_id_input: chainId });

  if (error) {
    console.error('getSupermarketChain error:', error);
    throw new Error('Failed to load supermarket data');
  }

  return data as SupermarketWithBranch[];
}