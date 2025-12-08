'use client';

import { SalesChartData } from "@/types";

export default function SalesChart({ data }: { data: SalesChartData[] }) {
  if (!data || data.length === 0) return (
    <div className="h-48 flex items-center justify-center text-gray-400 text-xs">Sem dados de vendas</div>
  );

  const maxVal = Math.max(...data.map(d => d.total_sales));

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-900">Performance de Vendas (7 dias)</h3>
        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold">Semanal</span>
      </div>

      <div className="flex items-end justify-between h-40 gap-2">
        {data.map((item, index) => {
          const heightPercent = (item.total_sales / maxVal) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center group">
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-8 bg-gray-900 text-white text-[10px] px-2 py-1 rounded mb-1 pointer-events-none z-10 whitespace-nowrap">
                R$ {item.total_sales.toFixed(2)}
              </div>
              
              {/* Barra */}
              <div 
                className="w-full bg-blue-100 rounded-t-lg relative hover:bg-blue-500 transition-colors duration-300"
                style={{ height: `${heightPercent}%` }}
              >
                {/* Linha de topo decorativa */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-300 rounded-t-lg opacity-50"></div>
              </div>
              
              {/* Legenda */}
              <span className="text-[10px] text-gray-400 mt-2 font-medium">{item.date_label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}