import { supabaseServer } from '../supabase/server';

// Atualiza o status do pedido para FINALIZADO ou AGUARDANDO PAGAMENTO
// E vincula o método de pagamento escolhido
export async function finishOrder(orderId: number, paymentMethod: string, paymentDetails: any) {
  const supabase = supabaseServer();

  // 1. Atualiza o status do pedido
  const { error: orderError } = await supabase
    .from('orders')
    .update({ 
      status: 'PAID', // Sai de CURRENT para PENDING (Aguardando confirmação do pagamento)
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

  return true;
}