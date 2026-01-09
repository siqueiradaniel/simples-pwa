'use server';

import { supabaseServer } from '../supabase/server';
import { OrderWithUser } from '@/types';

/**
 * Busca APENAS os pedidos do usuário logado.
 * Segurança: Confia no RLS do banco de dados para filtrar.
 */
export async function getUserOrders() {
  const supabase = await supabaseServer();
  
  // O RLS (Row Level Security) garante que "select *" retorne apenas os meus pedidos
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      user_id,
      status,
      total_price,
      created_at,
      profiles (
        full_name,
        phone_number
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getUserOrders error:', error);
    return [];
  }

  // Mapeia para o formato compatível com os componentes de UI
  return data.map((order: any) => ({
    id: order.id,
    user_id: order.user_id,
    fullName: order.profiles?.full_name || 'Eu',
    phoneNumber: order.profiles?.phone_number || '',
    status: order.status,
    totalPrice: order.total_price,
    dAt: order.created_at // O componente espera dAt ou created_at, ajustamos aqui
  })) as OrderWithUser[];
}

/**
 * Busca TODOS os pedidos da filial (Para ADMIN/STAFF).
 * Usa a função RPC otimizada do banco.
 */
export async function getOrdersWithUsers(branchId: number) {
  const supabase = await supabaseServer();

  // Verificação extra de permissão poderia ser feita aqui, 
  // mas a Policy do banco já deve bloquear se não for Staff.
  const { data, error } = await supabase
    .rpc('get_orders_with_users', { bid: branchId });

  if (error) {
    console.error('getOrdersWithUsers error:', error);
    throw new Error('Failed to load orders for branch');
  }

  return data as OrderWithUser[];
}