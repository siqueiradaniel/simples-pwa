'use client';

import { MapPin } from "lucide-react";
import { NeighborhoodShareData } from "@/types";

export default function NeighborhoodChart({ data }: { data: NeighborhoodShareData[] }) {
  if (!data || data.length === 0) return null;

  // Calcula total para porcentagens
  const totalCustomers = data.reduce((acc, item) => acc + item.customer_count, 0);
  
  // Cores profissionais para o gráfico
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']; // Blue, Emerald, Amber, Red, Violet

  // Gera o gradiente cônico para o CSS
  let currentAngle = 0;
  const gradientParts = data.map((item, index) => {
    const percentage = (item.customer_count / totalCustomers) * 100;
    const start = currentAngle;
    currentAngle += percentage;
    const color = colors[index % colors.length];
    return `${color} ${start}% ${currentAngle}%`;
  }).join(', ');

  const chartStyle = {
    background: `conic-gradient(${gradientParts})`,
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MapPin size={16} className="text-blue-500" />
        Clientes por Bairro
      </h3>

      <div className="flex flex-col items-center">
        {/* Gráfico Donut CSS Puro */}
        <div className="relative w-40 h-40 rounded-full" style={chartStyle}>
          {/* Buraco do Donut */}
          <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
            <span className="text-2xl font-bold text-gray-900">{totalCustomers}</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Total</span>
          </div>
        </div>

        {/* Legenda */}
        <div className="mt-6 w-full grid grid-cols-2 gap-x-4 gap-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 overflow-hidden">
                <div 
                  className="w-2.5 h-2.5 rounded-full shrink-0" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-gray-600 truncate">{item.neighborhood}</span>
              </div>
              <span className="font-bold text-gray-900">
                {Math.round((item.customer_count / totalCustomers) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}