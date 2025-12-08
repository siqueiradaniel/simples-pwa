'use client';

import { TopProductData } from "@/types";
import { Trophy } from "lucide-react";

export default function ProductRanking({ products }: { products: TopProductData[] }) {
  if (!products.length) return null;

  // Encontra o maior valor para fazer a barra de progresso relativa
  const maxQty = Math.max(...products.map(p => p.quantity_sold));

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
        <Trophy size={16} className="text-yellow-500" />
        Top Produtos Vendidos
      </h3>

      <div className="space-y-5">
        {products.map((product, index) => (
          <div key={index}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-gray-700 truncate pr-4">
                {index + 1}. {product.name}
              </span>
              <span className="text-gray-500 font-medium whitespace-nowrap">
                {product.quantity_sold} un.
              </span>
            </div>
            {/* Barra de Progresso */}
            <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                style={{ width: `${(product.quantity_sold / maxQty) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1 text-right">
              R$ {new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(product.revenue_generated)} gerados
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}