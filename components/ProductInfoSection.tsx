'use client';

import { Package, DollarSign, BarChart3 } from "lucide-react";
import { InventorySummary } from "@/types";

export default function ProductInfoSection({ product }: { product: InventorySummary }) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.sell_price);
  
  // Cálculo simples de margem estimada (baseado no custo médio se houver)
  const avgCost = product.average_cost || 0;
  const estimatedMargin = avgCost > 0 ? ((product.sell_price - avgCost) / product.sell_price) * 100 : 0;

  return (
    <div className="bg-white p-4 pb-6 border-b border-gray-100">
      <div className="flex gap-4">
        {/* Imagem Grande */}
        <div className="w-24 h-24 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
          <img 
            src={product.image_url || ''} 
            alt={product.product_name} 
            className="w-full h-full object-contain p-2 rounded-[8px]"
            onError={(e) => {
               (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=Prod';
            }}
          />
        </div>

        <div className="flex-1 min-w-0 py-1">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wide">
              {product.category_title}
            </span>
            <span className="text-xs text-gray-400 font-mono">#{product.product_code}</span>
          </div>
          
          <h1 className="text-lg font-bold text-gray-900 mt-1 leading-tight">{product.product_name}</h1>
          
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-xs text-gray-500">Venda:</span>
            <span className="text-lg font-bold text-blue-600">{formattedPrice}</span>
          </div>
        </div>
      </div>

      {/* Grid de Estatísticas Rápidas */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-[10px] text-gray-500 mb-1 flex items-center gap-1">
            <Package size={10} /> Total
          </span>
          <span className="text-lg font-bold text-gray-900">{product.total_stock}</span>
          <span className="text-[10px] text-gray-400">{product.unit}</span>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-[10px] text-gray-500 mb-1 flex items-center gap-1">
            <DollarSign size={10} /> Custo Méd.
          </span>
          <span className="text-lg font-bold text-gray-900">
            {new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(avgCost)}
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-[10px] text-gray-500 mb-1 flex items-center gap-1">
            <BarChart3 size={10} /> Margem
          </span>
          <span className={`text-lg font-bold ${estimatedMargin > 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
            {estimatedMargin.toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
}