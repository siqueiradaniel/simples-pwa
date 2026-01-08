// app/account/page.tsx
import AccountPageClient from "@/components/account/AccountPageClient";
import { getOrdersWithUsers } from "@/lib/api/orders";
import { OrderWithUser } from "@/types";

export default async function AccountPage() {
  const branchId = 1; // Fixo por enquanto
  const userId = 'ca463a4e-ec85-4052-991f-dd3af9406693';
  
  // Busca todos os pedidos da filial
  const allOrders = await getOrdersWithUsers(branchId);
  
  // Filtra para garantir que só apareçam os pedidos do usuário logado
  // (Agora vai funcionar pois a view retorna user_id)
  const userOrders = allOrders.filter((order: any) => order.user_id === userId);

  return <AccountPageClient orders={userOrders} userId={userId} />;
}