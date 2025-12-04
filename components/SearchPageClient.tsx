'use client';

import { useState } from "react";
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import { UIProduct } from "@/types";

export default function SearchPageClient({ products }: { products: UIProduct[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra produtos com base na busca
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de pesquisa interativa */}
      <SearchBar 
        value={searchTerm} 
        onChange={setSearchTerm} 
        autoFocus={true} 
      />

      <div className="px-4 pb-4">
        <h1 className="text-lg font-bold text-gray-800 mb-3 mt-2">
          {searchTerm ? `Resultados para "${searchTerm}"` : 'Todos os produtos'}
        </h1>
        
        {/* Grid de Produtos: 2 colunas */}
        <div className="grid grid-cols-2 gap-3 pb-safe">
          {filteredProducts.map(product => (
            // Forçamos o card a ocupar 100% da largura da célula do grid
            <div key={product.product_id} className="w-full flex justify-center">
                <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <p>Nenhum produto encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}