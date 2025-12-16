import RouteDetailsPageClient from "@/components/routes/RouteDetailsPageClient";
import { getRouteOrders } from "@/lib/api/routes";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RouteDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const routeId = Number(id);

  // Busca os pedidos desta rota
  const orders = await getRouteOrders(routeId);

  return <RouteDetailsPageClient routeId={routeId} orders={orders} />;
}