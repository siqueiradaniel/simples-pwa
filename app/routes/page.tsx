import RoutesPageClient from "@/components/routes/RoutesPageClient";
import { getPendingRoutingOrders, getActiveRoutes } from "@/lib/api/routes";

export default async function RoutesPage() {
  const branchId = 1; // Fixo por enquanto

  // Busca paralela
  const [pendingOrders, activeRoutes] = await Promise.all([
    getPendingRoutingOrders(branchId),
    getActiveRoutes()
  ]);

  return <RoutesPageClient pendingOrders={pendingOrders} activeRoutes={activeRoutes} />;
}