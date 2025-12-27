'use server'

import { revalidatePath } from 'next/cache';
import { supabaseServer } from '../supabase/server';
import { Address, UserAddress } from '@/types';

// Busca um endereço pelo ID (Para edição)
export async function getAddressById(addressId: number) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('address')
    .select('*')
    .eq('id', addressId)
    .single();

  if (error) {
    console.error('getAddressById error:', error);
    return null; // Retorna null se não achar, para tratarmos na página
  }

  return data as Address;
}

// Salva o endereço físico (Cria ou Atualiza)
export async function saveAddress(address: Address) {
  const supabase = await supabaseServer();
  const { id, ...addressData } = address;

  // 1. Prepare the query (don't await yet)
  // Logic: If ID exists > Update. Otherwise > Insert.
  const mutation = (id && id > 0)
    ? supabase.from('address').update(addressData).eq('id', id).select().single()
    : supabase.from('address').insert(addressData).select().single();

  // 2. Execute and wait for result
  const { data, error } = await mutation;

  if (error) {
    console.error('saveAddress Error:', error); // Good practice to log it
    throw new Error(error.message);
  }

  // 3. Revalidate (Clean execution)
  revalidatePath('/addresses');
  revalidatePath('/checkout/address');

  return data;
}

// Vincula endereço ao usuário
export async function linkAddressToUser(userId: number, addressId: number, label: string, isDefault: boolean) {
  const supabase = await supabaseServer();

  if (isDefault) {
    await supabase
      .from('user_address')
      .update({ is_default: false })
      .eq('user_id', userId);
  }

  // Verifica se já existe vínculo (para edição de label/default)
  const { data: existingLink } = await supabase
    .from('user_address')
    .select('id')
    .eq('user_id', userId)
    .eq('address_id', addressId)
    .single();

  if (existingLink) {
    const { error } = await supabase
      .from('user_address')
      .update({ label, is_default: isDefault })
      .eq('id', existingLink.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from('user_address').insert({
      user_id: userId,
      address_id: addressId,
      label: label,
      is_default: isDefault
    });
    if (error) throw new Error(error.message);
  }

  revalidatePath('/addresses');
  revalidatePath('/checkout/address');
}

// Busca todos os endereços de um usuário
export async function getUserAddresses(userId: number) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('user_address')
    .select(`
      id,
      user_id,
      address_id,
      label,
      is_default,
      address (
        id,
        street,
        number,
        neighborhood,
        city,
        state,
        cep,
        complement,
        reference
      )
    `)
    .eq('user_id', userId)
    .order('is_default', { ascending: false }); // Padrão primeiro

  if (error) {
    console.error('getUserAddresses error:', error);
    return [];
  }

  // Ajuste de tipagem para garantir que o retorno corresponda ao esperado
  // O supabase retorna um array de objetos onde 'address' é um objeto único ou array dependendo da relação
  // Aqui assumimos que é um objeto único (relação 1:1 no join)
  return data as unknown as UserAddress[];
}