import AccountPageClient from "@/components/AccountPageClient";
import { getOrdersWithUsers } from "@/lib/api/orders";
import { OrderWithUser } from "@/types";

export default async function AccountPage() {
  const branchId = 1; // Fixo por enquanto
  
  // Busca os pedidos reais. 
  // Nota: Idealmente, essa função deveria filtrar pelo ID do usuário logado também.
  const orders: OrderWithUser[] = await getOrdersWithUsers(branchId);

  return <AccountPageClient orders={orders} />;
}