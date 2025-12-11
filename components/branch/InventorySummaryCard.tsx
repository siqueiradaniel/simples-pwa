'use client';

import { Package, Calendar, AlertCircle } from "lucide-react";
import { InventorySummary } from "@/types";
import { format, parseISO, isBefore, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

export default function InventorySummaryCard({ item }: { item: InventorySummary }) {
  // Lógica de Status
  const isLowStock = item.total_stock <= item.min_stock_limit;
  const isOutOfStock = item.total_stock === 0;

  let statusColor = "bg-green-50 text-green-700 border-green-100";
  let statusText = "Estoque Normal";

  if (isOutOfStock) {
    statusColor = "bg-red-50 text-red-700 border-red-100";
    statusText = "Esgotado";
  } else if (isLowStock) {
    statusColor = "bg-orange-50 text-orange-700 border-orange-100";
    statusText = "Estoque Baixo";
  }

  // Lógica de Validade
  let expirationText = null;
  let isExpiringSoon = false;

  if (item.next_expiration) {
    const date = parseISO(item.next_expiration);
    expirationText = format(date, "dd/MM/yyyy");
    // Alerta se vencer em menos de 15 dias
    if (isBefore(date, addDays(new Date(), 15))) {
      isExpiringSoon = true;
    }
  }

  // Formata preço de venda
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.sell_price);

  return (
    <Link 
      href={`/branch/${item.branch_id}/inventory/${item.config_id}`} // Link para detalhes dos lotes
      className={`block bg-white rounded-xl border border-gray-200 shadow-sm p-3 hover:border-blue-300 transition-all active:bg-gray-50`}
    >
      <div className="flex gap-3">
        {/* Imagem */}
        <div className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
          <img 
            src={item.image_url || ''} 
            alt={item.product_name} 
            className="w-full h-full object-contain p-1 rounded-[6px]"
            onError={(e) => {
               (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=Prod';
            }}
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <AlertCircle size={20} className="text-red-500" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-bold text-gray-900 truncate pr-2">{item.product_name}</h3>
              <span className="text-[10px] font-mono text-gray-400">#{item.product_code}</span>
            </div>
            
            {/* Status Badge */}
            <div className="mt-1 flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                {statusText}
              </span>
              {isExpiringSoon && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center gap-1">
                  <Calendar size={10} /> Vence logo
                </span>
              )}
            </div>
          </div>

          <div className="flex items-end justify-between mt-2">
            <div className="flex items-center gap-1 text-gray-600">
              <Package size={14} strokeWidth={2} />
              <span className="text-sm font-bold">{item.total_stock}</span>
              <span className="text-[10px] text-gray-400 font-medium">{item.unit}</span>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] text-gray-400 block">Venda</span>
              <span className="text-xs font-bold text-gray-800">{formattedPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}