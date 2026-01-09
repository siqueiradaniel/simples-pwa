'use server'

import { supabaseServer } from '../supabase/server';
import { SupermarketWithBranch } from '@/types';

export async function getSupermarketChain(chainId: number) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .rpc('get_supermarket_with_filials', { chain_id_input: chainId });

  if (error) {
    console.error('getSupermarketChain error:', error);
    throw new Error('Failed to load supermarket data');
  }

  return data as SupermarketWithBranch[];
}

// Busca configurações básicas da rede (valor mínimo, logo, etc)
export async function getSupermarketSettings(chainId: number) {
  const supabase = await supabaseServer();
  
  const { data, error } = await supabase
    .from('supermarket_chain')
    .select('minimum_order_value, delivery_end_time')
    .eq('id', chainId)
    .single();

  if (error) {
    console.error('getSupermarketSettings error:', error);
    return null;
  }
  
  return data;
}