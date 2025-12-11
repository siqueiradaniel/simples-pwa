import SupermarketPageClient from "@/components/supermarket/SupermarketPageClient";
import { getSupermarketChain } from "@/lib/api/supermarket";

export default async function SupermarketChainPage() {
  const chainId = 1; // Fixo por enquanto, ou vindo de contexto
  const data = await getSupermarketChain(chainId);

  return <SupermarketPageClient data={data} />;
}