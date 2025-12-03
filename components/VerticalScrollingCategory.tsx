'use client';

import ProductCard from "./ProductCard";

interface VerticalScrollingCategoryProps {
  title: string;
  products: any[];  // ou tipado com seu BranchProductWithInventory
}

export default function VerticalScrollingCategory({ title, products }: VerticalScrollingCategoryProps) {
  return (
    <div className='w-full bg-white py-3 border-t border-gray-50'>
      <div className='flex justify-between items-center px-4 mb-3'>
        <h2 className='text-gray-800 text-lg font-bold'>{title}</h2>
        <button className='text-cyan-500 text-xs font-bold uppercase tracking-wide'>
          See More
        </button>
      </div>

      <div className='overflow-x-auto scrollbar-hide pb-2'>
        <div className='flex gap-3 px-4 w-max snap-x'>
          {products.map(product => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}