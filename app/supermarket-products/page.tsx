import SupermarketProductsClient from "@/components/supermarket/SupermarketProductsClient";
import { getSupermarketProducts } from "@/lib/api/supermarket-products";

export default async function SupermarketProductsPage() {
  const chainId = 1; // ID da rede (fixo por enquanto ou vindo da sessão do dono)
  
  // Busca os dados no servidor
  const products = await getSupermarketProducts(chainId);

  return <SupermarketProductsClient products={products} />;
}