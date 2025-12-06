import ProductDetailsPageClient from "@/components/ProductDetailsPageClient";
import { getProductConfigDetails, getProductBatches } from "@/lib/api/inventory";

interface PageProps {
  params: Promise<{ id: string; configId: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { configId } = await params;
  
  // Busca em paralelo para ser mais rápido
  const [product, batches] = await Promise.all([
    getProductConfigDetails(Number(configId)),
    getProductBatches(Number(configId))
  ]);

  return <ProductDetailsPageClient product={product} batches={batches} />;
}