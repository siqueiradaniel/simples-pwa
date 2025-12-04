import { getProductsForBranch } from "@/lib/api/products";
import HomeClient from "./HomeClient";
import { UIProduct } from "@/types/index"; // ajuste o caminho se necessário

export default async function HomePageServer() {
  const branchId = 1;
  const products: UIProduct[] = await getProductsForBranch(branchId);

  return <HomeClient products={products} />;
}
