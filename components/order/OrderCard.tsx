'use client';

import { Smile } from "lucide-react";

export interface OrderUI {
  id: number;
  statusText: string;
  subText: string;
  price: number;
}

export default function OrderCard({ order }: { order: OrderUI }) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(order.price);

  // Define cores baseadas no texto do status (opcional, para feedback visual)
  const isCanceled = order.statusText.toLowerCase().includes('cancelada');
  const iconBgClass = isCanceled ? 'bg-red-100 text-red-500' : 'bg-cyan-500 text-white';

  return (
    <div className="flex items-center justify-between py-4 bg-white">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconBgClass}`}>
          <Smile size={28} strokeWidth={2} />
        </div>
        
        <div className="flex flex-col">
          <span className={`text-sm font-medium ${isCanceled ? 'text-gray-500' : 'text-gray-800'}`}>
            {order.statusText}
          </span>
          <span className="text-[10px] text-gray-400">{order.subText}</span>
        </div>
      </div>

      <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
        {formattedPrice}
      </span>
    </div>
  );
}