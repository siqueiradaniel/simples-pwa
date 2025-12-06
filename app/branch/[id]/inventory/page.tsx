import InventoryPageClient from "@/components/InventoryPageClient";
import { getInventorySummary } from "@/lib/api/inventory";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BranchInventoryPage({ params }: PageProps) {
  const { id } = await params;
  
  // Busca o resumo consolidado do estoque
  const inventory = await getInventorySummary(Number(id));

  return <InventoryPageClient inventory={inventory} />;
}