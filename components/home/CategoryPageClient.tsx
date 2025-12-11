'use client';

import { useState } from "react";
import SearchBar from '@/components/home/SearchBar';
import ProductCard from '@/components/home/ProductCard';
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { UIProduct } from "@/types";

interface CategoryPageClientProps {
  title: string;
  products: UIProduct[];
}

export default function CategoryPageClient({ title, products }: CategoryPageClientProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // Lógica de filtro local: busca apenas nos produtos desta categoria
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com Voltar + Barra de Pesquisa Local */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="flex items-center px-2 py-2">
          <button 
            onClick={() => router.back()} 
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full mr-1"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1">
            {/* Removemos o readOnly para permitir digitação aqui mesmo */}
            <SearchBar 
              value={searchTerm}
              onChange={setSearchTerm}
              // Opcional: Placeholder personalizado para indicar busca contextual
              // placeholder={`Buscar em ${title}`} 
            />
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <h1 className="text-xl font-bold text-gray-800 mb-4 mt-4">
          {title} <span className="text-gray-400 text-sm font-normal">({filteredProducts.length} itens)</span>
        </h1>
        
        {/* Renderiza a lista filtrada */}
        <div className="grid grid-cols-2 gap-3 pb-safe">
          {filteredProducts.map(product => (
            <div key={product.product_id} className="w-full flex justify-center">
                <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Feedback de lista vazia (seja por falta de produtos ou filtro sem resultados) */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p>
              {searchTerm 
                ? `Nenhum resultado para "${searchTerm}" em ${title}.` 
                : "Nenhum produto nesta categoria."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}