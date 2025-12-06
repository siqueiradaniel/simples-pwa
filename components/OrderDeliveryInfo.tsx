'use client';

import { MapPin, User, Phone } from "lucide-react";
import { OrderDetails } from "@/types";

export default function OrderDeliveryInfo({ order }: { order: OrderDetails }) {
  return (
    <div className="bg-white p-4 border-y border-gray-100 mb-6">
      <h3 className="text-xs font-bold text-gray-900 uppercase mb-4 tracking-wide">Entrega</h3>
      
      <div className="space-y-4">
        {/* Endereço */}
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <MapPin size={16} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 mb-0.5 uppercase">Endereço de Entrega</p>
            <p className="text-sm font-medium text-gray-900 leading-snug">
              {order.street}, {order.address_number}
            </p>
            <p className="text-xs text-gray-500">
              {order.neighborhood} - {order.city}/{order.state}
            </p>
            {(order.complement || order.reference) && (
              <p className="text-xs text-gray-400 mt-1 italic">
                {order.complement} {order.reference ? `• ${order.reference}` : ''}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-50"></div>

        {/* Cliente */}
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
            <User size={16} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-500 mb-0.5 uppercase">Cliente</p>
            <p className="text-sm font-medium text-gray-900">{order.customer_name}</p>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
              <Phone size={10} />
              <span>{order.customer_phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}