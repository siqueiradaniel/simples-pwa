'use server'

import { revalidatePath } from 'next/cache';
import { supabaseServer } from '../supabase/server';
import { Database } from '@/types/supabase';

export type UserProfile = Database['public']['Tables']['profiles']['Row'];

// Busca dados do perfil
export async function getUserById(userId: string) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('getUserById error:', error);
    return null;
  }

  return data;
}

// Atualiza dados do perfil (Tabela profiles)
export async function updateUser(userId: string, data: Partial<UserProfile>) {
  const supabase = await supabaseServer();

  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/', 'layout');
}

// NOVA: Atualiza a senha (Supabase Auth)
export async function updateUserPassword(password: string) {
  const supabase = await supabaseServer();
  
  const { error } = await supabase.auth.updateUser({ 
    password: password 
  });

  if (error) {
    throw new Error(error.message);
  }
}