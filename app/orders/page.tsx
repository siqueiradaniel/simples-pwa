import OrdersListPageClient from "@/components/order/OrdersListPageClient";
import { getOrdersWithUsers } from "@/lib/api/orders";
import { OrderWithUser } from "@/types";

export default async function OrdersPage() {
  const branchId = 1; // Fixo por enquanto
  const userId = 1; // User ID fixo
  
  // Busca todos e filtra pelo usuário
  const allOrders = await getOrdersWithUsers(branchId);
  const userOrders = allOrders.filter((order: any) => order.user_id === userId);

  return <OrdersListPageClient orders={userOrders} />;
}