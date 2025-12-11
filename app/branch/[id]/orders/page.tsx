import BranchOrdersClient from "@/components/branch/BranchOrdersClient";
import { getOrdersWithUsers } from "@/lib/api/orders";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BranchOrdersPage({ params }: PageProps) {
  const { id } = await params;
  const branchId = Number(id);
  
  // Busca TODOS os pedidos desta filial específica
  // A função getOrdersWithUsers já filtra por branch_id, que é exatamente o que queremos aqui.
  const orders = await getOrdersWithUsers(branchId);

  return <BranchOrdersClient orders={orders} branchId={branchId} />;
}