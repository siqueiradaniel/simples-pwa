import SearchPageClient from "@/components/home/SearchPageClient";
import { getProductsForBranch } from "@/lib/api/products";
import { UIProduct } from "@/types";

export default async function SearchPage() {
  const branchId = 1; // Fixo por enquanto
  // Reutiliza a mesma chamada de API da home para ter os dados
  const products: UIProduct[] = await getProductsForBranch(branchId);
  
  return <SearchPageClient products={products} />;
}