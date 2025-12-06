import { supabaseServer } from '../supabase/server';
import { InventorySummary, ProductBatch } from '@/types';

// Busca a lista consolidada para a tela principal de estoque
export async function getInventorySummary(branchId: number) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .rpc('get_branch_inventory_summary', { branch_id_input: branchId });

  if (error) {
    console.error('getInventorySummary error:', error);
    throw new Error('Failed to load inventory summary');
  }

  return data as InventorySummary[];
}

// Busca os lotes de um produto específico (para a tela de detalhes)
export async function getProductBatches(configId: number) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .rpc('get_product_batches', { config_id_input: configId });

  if (error) {
    console.error('getProductBatches error:', error);
    throw new Error('Failed to load product batches');
  }

  return data as ProductBatch[];
}