'use client';

import { useState } from "react";
import ProductsHeader from "./ProductsHeader";
import AdminProductCard from "./AdminProductCard";
import { AdminProduct } from "@/types";

export default function AdminProductsClient({ products }: { products: AdminProduct[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra por nome ou código
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-6">
      <ProductsHeader 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        totalCount={filteredProducts.length}
      />

      <div className="px-4 mt-4 flex flex-col gap-3">
        {filteredProducts.map(product => (
          <AdminProductCard key={product.product_id} product={product} />
        ))}

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center">
            <p className="text-sm">Nenhum produto encontrado.</p>
            <p className="text-xs mt-1 opacity-70">Tente buscar por outro nome ou código.</p>
          </div>
        )}
      </div>
    </div>
  );
}