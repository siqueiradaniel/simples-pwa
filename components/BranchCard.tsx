'use client';

import { MapPin, Mail, Phone, ChevronRight, Store } from "lucide-react";
import { SupermarketWithBranch } from "@/types";

export default function BranchCard({ data }: { data: SupermarketWithBranch }) {
  const address = `${data.street}, ${data.number}`;
  const city = `${data.city} - ${data.state}`;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden">
      {/* Faixa de identificação */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1.5 rounded-lg border border-gray-200 text-gray-500">
            <Store size={14} />
          </div>
          <span className="font-semibold text-gray-700 text-sm">{data.branch_name}</span>
        </div>
        <span className="text-[10px] font-mono text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
          ID: {data.branch_id}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {/* Dados Operacionais */}
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 leading-tight">{address}</span>
              <span className="text-[10px] text-gray-400">{data.neighborhood}, {city}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail size={14} className="text-gray-400 shrink-0" />
            <span className="text-xs text-gray-600 truncate">{data.branch_email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={14} className="text-gray-400 shrink-0" />
            <span className="text-xs text-gray-600">{data.branch_phone}</span>
          </div>
        </div>

        {/* Ação de Gestão */}
        <button className="mt-2 w-full flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors group-hover:bg-blue-700">
          <span className="text-xs font-semibold">Acessar Painel da Filial</span>
          <ChevronRight size={14} className="opacity-80" />
        </button>
      </div>
    </div>
  );
}