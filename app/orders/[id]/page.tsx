import OrderPageClient from "@/components/order/OrderPageClient";
import { getOrderDetails, getOrderItems } from "@/lib/api/order";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const orderId = Number(id);

  // Busca paralela para performance
  const [order, items] = await Promise.all([
    getOrderDetails(orderId),
    getOrderItems(orderId)
  ]);

  if (!order) {
    notFound();
  }

  return <OrderPageClient order={order} items={items} />;
}