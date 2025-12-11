import CategoryPageClient from "@/components/home/CategoryPageClient";
import { getProductsForBranch } from "@/lib/api/products";

// Esta função diz ao Next.js quais páginas gerar no momento do build (SSG)
export async function generateStaticParams() {
  const branchId = 1;
  const products = await getProductsForBranch(branchId);

  // Cria uma lista apenas com os IDs únicos das categorias
  const categoryIds = Array.from(new Set(products.map((p: any) => String(p.category_id))));

  // Retorna o formato que o Next.js espera: [{ id: '1' }, { id: '2' }, ...]
  return categoryIds.map((id) => ({
    id: id,
  }));
}

// Tipagem para os params da rota dinâmica
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ title?: string }>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { title } = await searchParams;
  
  const branchId = 1;
  const allProducts = await getProductsForBranch(branchId);
  
  // Filtra os produtos da categoria específica
  const categoryProducts = allProducts.filter(
    (p: any) => String(p.category_id) === id
  );

  // Define o título: usa o da URL, ou o do primeiro produto, ou um padrão
  const displayTitle = title ?? categoryProducts[0]?.category_title ?? "Categoria";

  return <CategoryPageClient title={displayTitle} products={categoryProducts} />;
}