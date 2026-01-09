import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { getOrCreateCartId, getCurrentOrder, getCartItems } from "@/lib/api/cart";
import CartPaymentPageClient from "@/components/checkout/payment/CartPaymentPageClient";

// Garante que a página não seja cacheada estaticamente, pois depende do carrinho atual
export const dynamic = 'force-dynamic';

export default async function CheckoutPaymentPage() {
  const supabase = await supabaseServer();
  
  // 1. Autenticação Robusta
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/checkout/payment");
  }

  const branchId = 1; // Contexto da filial (pode vir de cookie futuramente)

  // 2. Busca de Dados em Paralelo (Performance)
  // Primeiro garantimos o ID do carrinho
  const orderId = await getOrCreateCartId(user.id, branchId);

  // Depois buscamos os detalhes em paralelo para não bloquear a renderização (Waterfall)
  const [orderData, items] = await Promise.all([
    getCurrentOrder(orderId),
    getCartItems(orderId)
  ]);

  // Se o carrinho estiver vazio, volta para o carrinho
  if (!items || items.length === 0) {
    redirect("/cart");
  }

  const totalPrice = orderData?.total_price || 0;

  return (
    <CartPaymentPageClient 
      orderId={orderId} 
      totalPrice={totalPrice}
      items={items}
    />
  );
}