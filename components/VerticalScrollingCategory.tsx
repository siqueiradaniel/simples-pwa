'use client';

import Link from "next/link";
import ProductCard from "./ProductCard";

interface VerticalScrollingCategoryProps {
  title: string;
  products: any[];
}

export default function VerticalScrollingCategory({ title, products }: VerticalScrollingCategoryProps) {
  // Pega o ID da categoria do primeiro produto disponível para montar o link
  const categoryId = products[0]?.category_id;

  return (
    <div className='w-full bg-white py-3 border-t border-gray-50'>
      <div className='flex justify-between items-center px-4 mb-3'>
        <h2 className='text-gray-800 text-lg font-bold'>{title}</h2>
        
        {categoryId && (
          <Link 
            href={`/category/${categoryId}?title=${encodeURIComponent(title)}`}
            className='text-cyan-500 text-xs font-bold uppercase tracking-wide'
          >
            See More
          </Link>
        )}
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