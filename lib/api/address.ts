import { supabaseServer } from '../supabase/server';
import { Address, UserAddress } from '@/types';

// Busca um endereço pelo ID (Para edição)
export async function getAddressById(addressId: number) {
  const supabase = supabaseServer();

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
  const supabase = supabaseServer();

  // Remove ID se for undefined ou 0 para criar novo
  const { id, ...addressData } = address;

  let query = supabase.from('address');

  if (id && id > 0) {
    // Atualiza existente
    const { data, error } = await query.update(addressData).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
  } else {
    // Cria novo
    const { data, error } = await query.insert(addressData).select().single();
    if (error) throw new Error(error.message);
    return data;
  }
}

// Vincula endereço ao usuário
export async function linkAddressToUser(userId: number, addressId: number, label: string, isDefault: boolean) {
  const supabase = supabaseServer();

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
}

// Busca todos os endereços de um usuário
export async function getUserAddresses(userId: number) {
  const supabase = supabaseServer();

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