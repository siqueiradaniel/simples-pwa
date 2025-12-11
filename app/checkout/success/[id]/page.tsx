import OrderSuccessPageClient from "@/components/checkout/success/OrderSuccessPageClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderSuccessPage({ params }: PageProps) {
  const { id } = await params;

  return <OrderSuccessPageClient orderId={Number(id)} />;
}