'use client';

import { ChevronLeft, Settings, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChainHeaderProps {
  name: string;
  logoUrl: string;
  cnpj: string;
  branchCount: number;
}

export default function ChainHeader({ name, logoUrl, cnpj, branchCount }: ChainHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="px-4 py-3 flex items-center gap-19">
        <button 
          onClick={() => router.back()} 
          className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm font-semibold text-gray-900">Visão Geral da Rede</span>
        
      </div>

      <div className="px-6 pb-6 pt-2 flex items-center gap-5">
        <div className="w-16 h-16 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
          <img 
            src={logoUrl} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/80x80?text=Logo';
            }}
          />
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-gray-900 leading-tight">{name}</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">CNPJ: {cnpj}</p>
          
          <div className="flex items-center gap-1.5 mt-2">
            <Building2 size={12} className="text-blue-600" />
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              {branchCount} {branchCount === 1 ? 'Unidade' : 'Unidades'} ativas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}