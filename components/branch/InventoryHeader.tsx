'use client';

import { Search, ChevronLeft, Filter, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

interface InventoryHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  lowStockCount: number;
}

export default function InventoryHeader({ searchTerm, onSearchChange, lowStockCount }: InventoryHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => router.back()} 
          className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm font-semibold text-gray-900">Controle de Estoque</span>
        <button className="p-2 -mr-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
          <Filter size={20} />
        </button>
      </div>

      <div className="px-4 pb-4 space-y-3">
        {/* Alerta de Estoque Baixo (se houver) */}
        {lowStockCount > 0 && (
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex items-center gap-3">
            <div className="bg-orange-100 p-1.5 rounded-md text-orange-600">
              <AlertTriangle size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-orange-800">Atenção Necessária</p>
              <p className="text-[10px] text-orange-600">
                {lowStockCount} itens abaixo do estoque mínimo.
              </p>
            </div>
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar produto..." 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all placeholder:text-gray-400 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}