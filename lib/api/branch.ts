import { supabaseServer } from '../supabase/server';
import { BranchManagement } from '@/types';

export async function getBranchesForChain(chainId: number) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .rpc('get_branches_for_chain', { chain_id_input: chainId });

  if (error) {
    console.error('getBranchesForChain error:', error);
    throw new Error('Failed to load branches');
  }

  return data as BranchManagement[];
}