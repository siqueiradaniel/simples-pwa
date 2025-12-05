'use client';

import { MapPin, Phone, Box, ShoppingBag, Store, ExternalLink } from "lucide-react";
import { SupermarketWithBranch } from "@/types";
import Link from "next/link";

export default function BranchManagementCard({ data }: { data: SupermarketWithBranch }) {
  const address = `${data.street}, ${data.number}`;
  const cityState = `${data.city}/${data.state}`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Topo: Identificação e Status */}
      <div className="p-4 pb-3 flex justify-between items-start">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Store size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm leading-tight">
              {data.branch_name}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <span className="font-mono bg-gray-100 px-1 rounded text-[10px]">ID: {data.branch_id}</span>
              <span>•</span>
              <span className="text-green-600 font-medium">Ativa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Meio: Informações Rápidas */}
      <div className="px-4 pb-4 space-y-2">
        <div className="flex items-start gap-2">
          <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-600 leading-snug">
            {address}, {data.neighborhood} <br/> 
            <span className="text-gray-400">{cityState}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-gray-400 shrink-0" />
          <span className="text-xs text-gray-600">{data.branch_phone}</span>
        </div>
      </div>

      {/* Base: Ações Diretas (A mudança principal) */}
      <div className="mt-auto border-t border-gray-100 grid grid-cols-2 divide-x divide-gray-100 bg-gray-50/50">
        <Link 
          href={`/branch/${data.branch_id}/orders`}
          className="flex items-center justify-center gap-2 py-3 hover:bg-blue-50 active:bg-blue-100 transition-colors group"
        >
          <ShoppingBag size={16} className="text-gray-500 group-hover:text-blue-600 transition-colors" />
          <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-700">Pedidos</span>
        </Link>
        
        <Link 
          href={`/branch/${data.branch_id}/inventory`}
          className="flex items-center justify-center gap-2 py-3 hover:bg-cyan-50 active:bg-cyan-100 transition-colors group"
        >
          <Box size={16} className="text-gray-500 group-hover:text-cyan-600 transition-colors" />
          <span className="text-xs font-semibold text-gray-600 group-hover:text-cyan-700">Estoque</span>
        </Link>
      </div>
    </div>
  );
}