'use server'

import { revalidatePath } from 'next/cache';
import { supabaseServer } from '../supabase/server';

export type UserProfile = {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  birth_date: string;
  cpf: string;
  user_role: 'ADMIN' | 'CUSTOMER' | 'MANAGER';
};

// Busca dados do usuário pelo ID
export async function getUserById(userId: number) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('getUserById error:', error);
    return null;
  }

  return data as UserProfile;
}

// Atualiza dados do usuário
export async function updateUser(userId: number, data: Partial<UserProfile>) {
  const supabase = await supabaseServer();

  const { error } = await supabase
    .from('users')
    .update(data)
    .eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/', 'layout'); // Refreshes everything (Header, Profile, etc.)
}