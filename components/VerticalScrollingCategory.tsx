import { BranchProduct } from "@/types";
import ProductCard from "@/components/ProductCard"

interface VerticalScrollingCategoryProps {
  title: string;
}

const VerticalScrollingCategory = ({ title }: VerticalScrollingCategoryProps) => {
  // Mock de produtos (Mantido o seu mock)
  const mockProducts: BranchProduct[] = [
    {
      id: 1, stockQuantity: 50, initialQuantity: 100, minQuantity: 10, wantedQuantity: 80, buyPrice: 3.50, sellPrice: 23.43, profit: 3.49, totalCost: 350, totalToEarn: 699, currentEarn: 349, stockLevel: 'high', expirationDate: '2025-12-31', isAvailable: true, isPromotion: false, productId: 101, branchId: 1,
      productName: 'Arroz - Sepé Bianco Tipo 1',
      productImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqYgG4s4Ztq9V4z0u4z4u4z4u4z4u4z4u4z4', // Placeholder url fix
      brand: 'Sepé', unit: '5kg'
    },
    {
      id: 2, stockQuantity: 30, initialQuantity: 60, minQuantity: 5, wantedQuantity: 50, buyPrice: 4.20, sellPrice: 18.90, profit: 4.29, totalCost: 252, totalToEarn: 509, currentEarn: 257, stockLevel: 'medium', expirationDate: '2025-11-30', isAvailable: true, isPromotion: true, productId: 102, branchId: 1,
      productName: 'Feijão Carioca Camil',
      productImage: 'https://placehold.co/150x150?text=Feijao', 
      brand: 'Camil', unit: '1kg'
    },
    {
      id: 3, stockQuantity: 45, initialQuantity: 80, minQuantity: 8, wantedQuantity: 70, buyPrice: 3.80, sellPrice: 7.49, profit: 3.69, totalCost: 304, totalToEarn: 599, currentEarn: 295, stockLevel: 'high', expirationDate: '2026-01-15', isAvailable: true, isPromotion: false, productId: 103, branchId: 1,
      productName: 'Macarrão Espaguete Gallo',
      productImage: 'https://placehold.co/150x150?text=Macarrao', 
      brand: 'Gallo', unit: '500g'
    },
  ];

  return (
    <div className='w-full bg-white py-2 mb-4'>
      <div className='flex justify-between items-center px-4 mb-3'>
        <h2 className='text-gray-800 text-lg font-bold'>{title}</h2>
        <button className='text-cyan-400 text-sm font-bold hover:text-cyan-500'>
          See More
        </button>
      </div>

      <div className='overflow-x-auto scrollbar-hide pb-2'>
        <div className='flex gap-3 px-4 w-max'>
          {/* Renderizando mockProducts duplicados para demonstrar scroll */}
          {mockProducts.concat(mockProducts).map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalScrollingCategory