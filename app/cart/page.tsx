import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { getOrCreateCartId } from "@/lib/api/cart";
import { getSupermarketSettings } from "@/lib/api/supermarket";
import CartPageClient from "@/components/checkout/cart/CartPageClient";

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const supabase = await supabaseServer();
  
  // 1. Verificação de Sessão Segura
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/cart');
  }

  const branchId = 1; // Fixo (contexto de loja única por enquanto)
  const chainId = 1;  // Fixo (ID da rede)

  // 2. Busca configurações da rede (Valor Mínimo)
  const settings = await getSupermarketSettings(chainId);
  const minOrderValue = Number(settings?.minimum_order_value || 0);

  // 3. Garante que o carrinho existe no banco
  const orderId = await getOrCreateCartId(user.id, branchId);

  return (
    <CartPageClient 
      orderId={orderId} 
      minOrderValue={minOrderValue} 
    />
  );
}