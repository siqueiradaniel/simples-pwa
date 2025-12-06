'use client';

import { Calendar, TrendingDown, Box } from "lucide-react";
import { ProductBatch } from "@/types";
import { format, parseISO, isBefore, addDays, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function BatchCard({ batch }: { batch: ProductBatch }) {
  const expirationDate = batch.expiration_date ? parseISO(batch.expiration_date) : null;
  const today = new Date();

  // Lógica de Status do Lote
  let statusColor = "bg-white border-gray-200";
  let expirationLabel = expirationDate ? format(expirationDate, "dd MMM yyyy", { locale: ptBR }) : "Sem validade";
  let statusBadge = null;

  if (batch.quantity === 0) {
    statusColor = "bg-gray-50 border-gray-100 opacity-60"; // Lote esgotado
    statusBadge = <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded font-bold">Esgotado</span>;
  } else if (expirationDate) {
    const daysToExpire = differenceInDays(expirationDate, today);
    
    if (daysToExpire < 0) {
      statusColor = "bg-red-50 border-red-200";
      expirationLabel = "VENCIDO";
      statusBadge = <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">Vencido</span>;
    } else if (daysToExpire <= 15) {
      statusColor = "bg-orange-50 border-orange-200";
      statusBadge = <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold">Vence em {daysToExpire} dias</span>;
    }
  }

  // Barra de progresso de consumo
  const consumptionPercentage = ((batch.initial_quantity - batch.quantity) / batch.initial_quantity) * 100;

  return (
    <div className={`rounded-xl border ${statusColor} shadow-sm p-4 transition-all`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-gray-500 bg-white border border-gray-200 px-1.5 py-0.5 rounded">
              Lote: {batch.batch_code || 'S/N'}
            </span>
            {statusBadge}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Calendar size={12} />
            <span>Validade: <strong>{expirationLabel}</strong></span>
          </div>
        </div>
        
        <div className="text-right">
          <span className="block text-[10px] text-gray-400">Custo UN</span>
          <span className="font-bold text-gray-700">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(batch.cost_price)}
          </span>
        </div>
      </div>

      {/* Barra de Progresso do Estoque */}
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-gray-500 font-medium flex items-center gap-1">
            <Box size={12} /> Restam: <span className="text-gray-900 font-bold text-sm">{batch.quantity}</span>
          </span>
          <span className="text-gray-400 text-[10px]">
            Inicial: {batch.initial_quantity}
          </span>
        </div>
        
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              batch.quantity === 0 ? 'bg-gray-300' : 'bg-blue-500'
            }`}
            style={{ width: `${(batch.quantity / batch.initial_quantity) * 100}%` }}
          />
        </div>
        
        {batch.quantity > 0 && (
          <p className="text-[10px] text-gray-400 mt-1 text-right">
            {consumptionPercentage.toFixed(0)}% vendido
          </p>
        )}
      </div>
    </div>
  );
}