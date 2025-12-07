import { supabaseServer } from '../supabase/server';
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