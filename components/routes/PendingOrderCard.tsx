'use client';

import { MapPin, Box, User, CheckCircle2, Circle } from "lucide-react";
import { OrderForRouting } from "@/types";

interface PendingOrderCardProps {
  order: OrderForRouting;
  index: number;
  isSelected: boolean;
  onToggle: () => void;
}

export default function PendingOrderCard({ order, index, isSelected, onToggle }: PendingOrderCardProps) {
  return (
    <div 
      onClick={onToggle}
      className={`bg-white p-4 rounded-xl border transition-all duration-200 cursor-pointer active:scale-[0.99] flex gap-3 ${
        isSelected 
          ? 'border-blue-500 bg-blue-50/50 shadow-md' 
          : 'border-gray-100 hover:border-gray-300 shadow-sm'
      }`}
    >
      {/* Checkbox Visual */}
      <div className="mt-1">
        {isSelected ? (
          <CheckCircle2 className="text-blue-600" size={20} />
        ) : (
          <Circle className="text-gray-300" size={20} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-800 text-sm">Pedido #{order.order_number}</h3>
          <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
            {index + 1} no mapa
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <User size={12} className="text-gray-400" />
            <span className="truncate">{order.customer_name}</span>
          </div>
          
          <div className="flex items-start gap-2 text-xs text-gray-600">
            <MapPin size={12} className="text-gray-400 mt-0.5 shrink-0" />
            <span className="leading-tight line-clamp-2">
              {order.street}, {order.address_number} - {order.neighborhood}
            </span>
          </div>
        </div>
      </div>

      {/* Valor */}
      <div className="flex flex-col justify-end items-end">
        <span className="text-xs font-bold text-gray-900">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total_price)}
        </span>
      </div>
    </div>
  );
}