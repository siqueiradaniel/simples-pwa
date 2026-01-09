'use server'

import { supabaseServer } from '../supabase/server';
import { SupermarketUser } from '@/types';

export async function getSupermarketUsers(chainId: number) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .rpc('get_supermarket_users', { chain_id_input: chainId });

  if (error) {
    console.error('[getSupermarketUsers] Error:', error);
    throw new Error('Failed to load users');
  }

  return data as SupermarketUser[];
}