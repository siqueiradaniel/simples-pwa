'use client';

import { Search, ChevronLeft, Filter, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalCount: number;
}

export default function ProductsHeader({ searchTerm, onSearchChange, totalCount }: ProductsHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => router.back()} 
          className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <span className="text-sm font-semibold text-gray-900 block">Gerenciar Produtos</span>
          <span className="text-[10px] text-gray-400 font-medium">{totalCount} itens cadastrados</span>
        </div>
        <button className="p-2 -mr-2 text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
          <Plus size={20} />
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="px-4 pb-4 flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome, código..." 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all placeholder:text-gray-400 text-gray-700"
          />
        </div>
        <button className="p-2.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors">
          <Filter size={18} />
        </button>
      </div>
    </div>
  );
}