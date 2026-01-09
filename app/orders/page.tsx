import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserOrders } from "@/lib/api/orders";
import OrdersListPageClient from "@/components/order/OrdersListPageClient";

export default async function OrdersPage() {
  const supabase = await supabaseServer();
  
  // 1. Verifica autenticação
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/orders');
  }

  // 2. Busca pedidos do usuário (Seguro via RLS)
  const userOrders = await getUserOrders();

  return <OrdersListPageClient orders={userOrders} />;
}