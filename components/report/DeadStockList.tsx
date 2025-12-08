'use client';

import { AlertOctagon } from "lucide-react";
import { DeadStockProduct } from "@/types";

export default function DeadStockList({ products }: { products: DeadStockProduct[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
      {/* Decoração de Fundo */}
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <AlertOctagon size={100} className="text-red-500" />
      </div>

      <h3 className="text-sm font-bold text-red-700 mb-5 flex items-center gap-2">
        <AlertOctagon size={16} />
        Produtos Sem Giro (30 dias)
      </h3>

      <div className="space-y-4 relative z-10">
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg border border-red-100 flex items-center justify-center shrink-0 p-1">
              <img 
                src={product.image_url || 'https://placehold.co/100x100?text=Prod'} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply opacity-80" 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-gray-700 truncate pr-2">
                  {product.name}
                </span>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 whitespace-nowrap">
                  {product.current_stock} un. paradas
                </span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-red-400 h-full w-full opacity-50" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}