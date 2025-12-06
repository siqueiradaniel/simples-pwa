'use client';

import { Home, Briefcase, MapPin, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import { UserAddress } from "@/types";
import Link from "next/link";

export default function AddressCard({ userAddress }: { userAddress: UserAddress }) {
  const { address, label, is_default } = userAddress;

  // Seleciona ícone baseado no rótulo
  const getIcon = () => {
    const l = label.toLowerCase();
    if (l.includes('casa')) return Home;
    if (l.includes('trabalho')) return Briefcase;
    return MapPin;
  };

  const Icon = getIcon();

  if (!address) return null;

  return (
    <div className={`bg-white rounded-xl border p-4 transition-all relative group ${is_default ? 'border-blue-200 shadow-sm ring-1 ring-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
      
      <div className="flex items-start gap-4">
        {/* Ícone do Tipo */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${is_default ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-500'}`}>
          <Icon size={20} strokeWidth={2} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              {label}
              {is_default && (
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold border border-blue-100">
                  Principal
                </span>
              )}
            </h3>
          </div>

          <p className="text-sm text-gray-600 mt-1 leading-snug">
            {address.street}, {address.number}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {address.neighborhood} - {address.city}/{address.state}
          </p>
        </div>
      </div>

      {/* Ações (Linha Separadora) */}
      <div className="mt-4 pt-3 border-t border-gray-50 flex justify-end gap-3">
        <button className="text-xs font-medium text-red-500 flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded transition-colors">
          <Trash2 size={14} /> Excluir
        </button>
        <Link 
          href={`/addresses/${address.id}/edit`} 
          className="text-xs font-medium text-gray-600 flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
        >
          <Pencil size={14} /> Editar
        </Link>
        {/* Botão invisível que cobre o card para detalhe (opcional) */}
        {/* <Link href={`/addresses/${address.id}`} className="absolute inset-0 z-0" /> */}
      </div>
    </div>
  );
}