'use server';

import { supabaseServer } from '../supabase/server';
import { createSupabaseClient } from '../supabase/client';
import { OrderForRouting, ActiveRouteSummary } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getPendingRoutingOrders(branchId: number) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .rpc('get_pending_routing_orders', { branch_id_input: branchId });

  if (error) {
    console.error('[getPendingRoutingOrders] Error:', error);
    return [];
  }

  return data as OrderForRouting[];
}

export async function getActiveRoutes() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .rpc('get_active_routes_summary');

  if (error) {
    console.error('[getActiveRoutes] Error:', error);
    return [];
  }

  return data as ActiveRouteSummary[];
}

export async function createRoute(orderIds: number[]) {
  // Use client-side client for user interaction triggered actions
  const supabase = createSupabaseClient();
  
  // 1. Get Branch ID from first order (to link route to branch)
  const { data: firstOrder } = await supabase
      .from('orders')
      .select('branch_id')
      .eq('id', orderIds[0])
      .single();

  if (!firstOrder) throw new Error("Orders not found");

  // 2. Create Route
  const { data: route, error: routeError } = await supabase
    .from('route')
    .insert({
      branch_id: firstOrder.branch_id,
      estimated_time: orderIds.length * 15, 
      estimated_distance: orderIds.length * 2.5,
      status: 'PENDING'
    })
    .select()
    .single();

  if (routeError) throw new Error(`Erro ao criar rota: ${routeError.message}`);

  // 3. Update Orders
  const { error: ordersError } = await supabase
    .from('orders')
    .update({
      route_id: route.id,
      status: 'A_CAMINHO' // Changed from 'PENDING' to match order flow
    } as any)
    .in('id', orderIds);

  if (ordersError) throw new Error(`Erro ao atualizar pedidos: ${ordersError.message}`);

  revalidatePath('/routes'); 
  revalidatePath('/orders');
  return route;
}

export async function getRouteOrders(routeId: number) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .rpc('get_route_details', { route_id_input: routeId });

  if (error) {
    console.error('[getRouteOrders] Error:', error);
    return [];
  }

  return data as OrderForRouting[];
}