'use server'

import { supabaseServer } from '../supabase/server';
import { DashboardFullData } from '@/types';

export async function getDashboardData(branchId: number): Promise<DashboardFullData> {
  const supabase = await supabaseServer();
  
  const endDate = new Date().toISOString();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  const startDateStr = startDate.toISOString();

  // Executa TODAS as queries em paralelo
  const [kpiRes, chartRes, productsRes, deadStockRes, neighborhoodRes] = await Promise.all([
    supabase.rpc('get_dashboard_kpis', { branch_id_input: branchId, start_date: startDateStr, end_date: endDate }),
    supabase.rpc('get_sales_chart_data', { branch_id_input: branchId }),
    supabase.rpc('get_top_products_data', { branch_id_input: branchId }),
    supabase.rpc('get_dead_stock_products', { branch_id_input: branchId }),
    supabase.rpc('get_customers_by_neighborhood', { branch_id_input: branchId })
  ]);

  return {
    kpis: kpiRes.data || { revenue: 0, orders: 0, active_customers: 0, avg_ticket: 0 },
    salesChart: chartRes.data || [],
    topProducts: productsRes.data?.top_products || [],
    categoryShare: productsRes.data?.category_share || [],
    deadStock: deadStockRes.data || [],
    customersByNeighborhood: neighborhoodRes.data || []
  };
}