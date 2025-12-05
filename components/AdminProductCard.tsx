'use client';

import { BarChart3, Package } from "lucide-react";
import { AdminProduct } from "@/types";

export default function AdminProductCard({ product }: { product: AdminProduct }) {
  // Lógica simples para cor do estoque
  const stockColor = product.total_stock_quantity < 50 
    ? "text-orange-600 bg-orange-50" 
    : "text-emerald-600 bg-emerald-50";

  // Função para pegar as iniciais
  const getInitials = (name: string) => {
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[1][0]).toUpperCase();
  };

  // Gera a URL do placeholder dinamicamente
  const initials = getInitials(product.name);
  const placeholderUrl = `https://placehold.co/100x100?text=${initials}&bg=e2e8f0&color=64748b`; 

  // Define a imagem inicial
  const imageUrl = product.image_url && product.image_url.trim() !== '' 
    ? product.image_url 
    : placeholderUrl;

  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex gap-4 items-center active:bg-gray-50 transition-colors">
      {/* Container da Imagem */}
      <div className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain p-1 rounded-[6px]"
          onError={(e) => {
             (e.target as HTMLImageElement).src = placeholderUrl;
          }}
        />
      </div>

      {/* Informações Principais */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase tracking-wide">
            {product.category_title}
          </span>
          <span className="text-[10px] text-gray-400 font-mono">
            #{product.code}
          </span>
        </div>
        
        <h3 className="text-sm font-semibold text-gray-800 leading-tight truncate mb-2">
          {product.name}
        </h3>

        {/* Métricas (Estoque e Vendas) */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${stockColor}`}>
            <Package size={12} strokeWidth={2.5} />
            <span className="text-[10px] font-bold">
              {product.total_stock_quantity} <span className="font-normal opacity-80">{product.unit}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 text-gray-600">
            <BarChart3 size={12} strokeWidth={2.5} />
            <span className="text-[10px] font-bold">
              {product.units_sold} <span className="font-normal opacity-80">vendas</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}