import { getProductsForBranch } from "@/lib/api/products";
import HomeClient from "./HomeClient";

export default async function HomePageServer() {
  const branchId = 1;
  const products = await getProductsForBranch(branchId);

  return <HomeClient products={products} />;
}
