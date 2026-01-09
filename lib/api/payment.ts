'use server';

import { supabaseServer } from '../supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Finaliza o pedido, atualizando status e definindo timestamp de conclusão.
 * @param orderId ID do pedido
 * @param paymentMethod Método de pagamento escolhido (ex: 'pix', 'credit_card')
 */
export async function finishOrder(orderId: number, paymentMethod: string) {
  const supabase = await supabaseServer();

  // 1. Segurança: Verifica quem está chamando
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  // 2. Atualiza o pedido
  // Definimos status como 'PAID' (Pago) e payment_status como 'CONFIRMED'
  // Em um cenário real com Gateway de Pagamento, isso seria 'PENDING' até o webhook confirmar.
  // Para este PWA, assumimos sucesso imediato ou pagamento na entrega.
  
  const { error } = await supabase
    .from('orders')
    .update({ 
      status: 'PAID',           // Sai do status 'CURRENT' (Carrinho)
      payment_status: 'CONFIRMED',
      finished_at: new Date().toISOString(), // Marca o fim do ciclo
      // Se tiver campo para salvar o método de pagamento no banco, adicione aqui:
      // payment_method: paymentMethod 
    })
    .eq('id', orderId)
    .eq('user_id', user.id); // Garante que o usuário só finaliza o PRÓPRIO pedido

  if (error) {
    console.error('finishOrder Error:', error.message);
    throw new Error('Erro ao finalizar pedido no banco de dados.');
  }

  // 3. Limpa caches para garantir que a UI atualize (ex: número de itens no carrinho no header)
  revalidatePath('/', 'layout');
  
  return { success: true };
}