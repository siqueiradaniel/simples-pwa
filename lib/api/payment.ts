'use server';

import { supabaseServer } from '../supabase/server';
import { revalidatePath } from 'next/cache';

// Atualiza o status do pedido para FINALIZADO ou AGUARDANDO PAGAMENTO
// E vincula o método de pagamento escolhido
export async function finishOrder(orderId: number, paymentMethod: string, paymentDetails: any) {
  const supabase = await supabaseServer();

  // 1. Atualiza o status do pedido
  const { error: orderError } = await supabase
    .from('orders')
    .update({ 
      status: 'PAID', 
      payment_status: 'PENDING',
      d_at: new Date().toISOString() // Data real da efetivação
    })
    .eq('id', orderId);

  if (orderError) throw new Error(orderError.message);

  // 2. Aqui você salvaria os dados do pagamento na tabela 'payment'
  // Como exemplo simplificado:
  /*
  await supabase.from('payment').insert({
    order_id: orderId,
    amount: paymentDetails.amount,
    status: 'PENDING',
    d_at: new Date().toISOString()
  });
  */

  revalidatePath('/'); // Purge cache for the whole app
  return true;
}