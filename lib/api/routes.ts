import { supabaseServer } from '../supabase/server';
import { createSupabaseClient } from '../supabase/client';
import { OrderForRouting, ActiveRouteSummary } from '@/types';

export async function getPendingRoutingOrders(branchId: number) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .rpc('get_pending_routing_orders', { branch_id_input: branchId });

  if (error) {
    console.error('getPendingRoutingOrders error:', error);
    return [];
  }

  return data as OrderForRouting[];
}

export async function getActiveRoutes() {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .rpc('get_active_routes_summary');

  if (error) {
    console.error('getActiveRoutes error:', error);
    return [];
  }

  return data as ActiveRouteSummary[];
}

// Cria uma nova rota com os pedidos selecionados
export async function createRoute(orderIds: number[]) {
  // Usamos o client-side client pois esta ação é disparada pelo usuário no browser
  const supabase = createSupabaseClient();

  // 1. Criar a rota (Estimativas simplificadas por enquanto)
  // Em um cenário real, calcularíamos via Google Maps API ou similar antes de salvar
  const { data: route, error: routeError } = await supabase
    .from('route')
    .insert({
      estimated_time: orderIds.length * 15, // Ex: 15 min por pedido
      estimated_distance: orderIds.length * 2.5, // Ex: 2.5 km por pedido
      actual_time: null
    })
    .select()
    .single();

  if (routeError) throw new Error(`Erro ao criar rota: ${routeError.message}`);

  // 2. Atualizar os pedidos para vincular à rota e mudar status
  // Cast para 'any' no status se o type definition estiver desatualizado em relação ao banco
  const { error: ordersError } = await supabase
    .from('orders')
    .update({
      route_id: route.id,
      status: 'PENDING' 
    } as any)
    .in('id', orderIds);

  if (ordersError) throw new Error(`Erro ao atualizar pedidos: ${ordersError.message}`);

  return route;
}