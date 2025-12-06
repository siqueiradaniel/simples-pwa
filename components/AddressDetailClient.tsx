'use client';

import { ChevronLeft, MapPin, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Address } from "@/types";
import Link from "next/link";

interface AddressDetailClientProps {
  address: Address;
}

export default function AddressDetailClient({ address }: AddressDetailClientProps) {
  const router = useRouter();

  // Helper para exibir campos vazios
  const displayValue = (val?: string | number | null) => val || <span className="text-gray-300 italic">Não informado</span>;

  return (
    <div className="min-h-screen bg-white font-sans pb-10">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-blue-900">Detalhes do Endereço</h1>
        </div>
        
        {/* Botão de Editar (Opcional, mas útil) */}
        <Link 
          href={`/addresses/${address.id}/edit`}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          <Pencil size={20} />
        </Link>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Mapa Estático (Visual) */}
        <div className="w-full h-40 bg-blue-50 rounded-2xl border border-blue-100 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-30 bg-blue-200/50 pattern-grid-lg" />
          <div className="z-10 bg-white px-4 py-2 rounded-full shadow-sm text-xs font-semibold text-blue-600 flex items-center gap-2">
            <MapPin size={14} />
            {address.street}, {address.number}
          </div>
        </div>

        {/* Grupo de Informações */}
        <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-5 space-y-6">
          
          {/* Linha 1: Principal */}
          <div className="grid grid-cols-1 gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Logradouro</label>
            <p className="text-base font-semibold text-gray-900">{address.street}, {address.number}</p>
          </div>

          {/* Linha 2: Bairro e CEP */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Bairro</label>
              <p className="text-sm font-medium text-gray-700">{displayValue(address.neighborhood)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">CEP</label>
              <p className="text-sm font-medium text-gray-700">{displayValue(address.cep)}</p>
            </div>
          </div>

          {/* Linha 3: Cidade/UF */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cidade / Estado</label>
            <p className="text-sm font-medium text-gray-700">{address.city} - {address.state}</p>
          </div>

          {/* Linha 4: Complemento e Referência */}
          <div className="pt-4 border-t border-gray-100 grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Complemento</label>
              <p className="text-sm text-gray-600">{displayValue(address.complement)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ponto de Referência</label>
              <p className="text-sm text-gray-600">{displayValue(address.reference)}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}