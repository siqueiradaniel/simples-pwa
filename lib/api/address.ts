'use server'

import { revalidatePath } from 'next/cache';
import { supabaseServer } from '../supabase/server';
import { Address, UserAddress } from '@/types';

// ==========================================
// BUSCAR ENDEREÇO POR ID (UUID)
// ==========================================
export async function getAddressById(addressId: string): Promise<Address | null> {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('address')
    .select('*')
    .eq('id', addressId) // Supabase trata UUID automaticamente aqui
    .single();

  if (error) {
    console.error(`[getAddressById] Error fetching address ${addressId}:`, error.message);
    return null;
  }

  return data as Address;
}

// ==========================================
// SALVAR ENDEREÇO (Cria ou Atualiza)
// ==========================================
export async function saveAddress(address: Partial<Address>) {
  const supabase = await supabaseServer();
  const { id, ...addressData } = address;

  // Se tiver ID (UUID válido), atualiza. Senão, cria.
  // Nota: Verifique se seu Address type no frontend espera string no ID agora.
  const mutation = id 
    ? supabase.from('address').update(addressData).eq('id', id).select().single()
    : supabase.from('address').insert(addressData).select().single();

  const { data, error } = await mutation;

  if (error) {
    throw new Error(`Erro ao salvar endereço: ${error.message}`);
  }

  // Revalida as rotas que usam endereços
  revalidatePath('/addresses');
  revalidatePath('/checkout/address');

  return data;
}

// ==========================================
// VINCULAR ENDEREÇO AO USUÁRIO
// ==========================================
export async function linkAddressToUser(
  userId: string, 
  addressId: string, // Alterado para string (UUID)
  label: string, 
  isDefault: boolean
) {
  const supabase = await supabaseServer();

  // Transação implícita: Resetar default se necessário
  if (isDefault) {
    await supabase
      .from('user_address')
      .update({ is_default: false })
      .eq('user_id', userId);
  }

  // Verifica vínculo existente (Upsert logic manual para controle refinado)
  const { data: existingLink } = await supabase
    .from('user_address')
    .select('id')
    .eq('user_id', userId)
    .eq('address_id', addressId)
    .single();

  if (existingLink) {
    await supabase
      .from('user_address')
      .update({ label, is_default: isDefault })
      .eq('id', existingLink.id);
  } else {
    await supabase
      .from('user_address')
      .insert({
        user_id: userId,
        address_id: addressId,
        label,
        is_default: isDefault
      });
  }

  revalidatePath('/addresses');
  revalidatePath('/checkout/address');
}

// ==========================================
// LISTAR ENDEREÇOS
// ==========================================
export async function getUserAddresses(userId: string): Promise<UserAddress[]> {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from('user_address')
    .select(`
      id,
      user_id,
      address_id,
      label,
      is_default,
      address (*) 
    `)
    .eq('user_id', userId)
    .order('is_default', { ascending: false });

  if (error || !data) return [];

  // Mapeamento plano (Flattening) para facilitar o frontend
  return data.map((item: any) => ({
    id: item.id,
    user_id: item.user_id,
    address_id: item.address_id,
    label: item.label,
    is_default: item.is_default,
    ...item.address // Espalha as propriedades do endereço (street, number, etc) na raiz
  })) as UserAddress[];
}