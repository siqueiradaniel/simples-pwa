'use client';

import { MapPin } from "lucide-react";
import { OrderForRouting } from "@/types";

export default function RouteMap({ orders }: { orders: OrderForRouting[] }) {
  return (
    <div className="w-full h-[40vh] bg-blue-50 relative overflow-hidden border-b border-gray-200">
      {/* Background de Mapa Estilizado */}
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_placeholder.png')] bg-cover bg-center opacity-60 grayscale-[20%]" />
      
      {/* Pins Simulados (Espalhados aleatoriamente para demo visual se não tiver lat/long real) */}
      {orders.map((order, index) => {
        // Gera posições aleatórias fixas baseadas no ID para simular distribuição no mapa
        // Em produção, usaria order.latitude e order.longitude reais
        const top = `${(order.order_id * 13) % 80 + 10}%`;
        const left = `${(order.order_id * 7) % 80 + 10}%`;

        return (
          <div 
            key={order.order_id}
            className="absolute flex flex-col items-center group cursor-pointer hover:z-50 transition-all hover:scale-110"
            style={{ top, left }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold">
                {index + 1}
              </div>
              <div className="w-2 h-2 bg-black/20 rounded-full absolute -bottom-1 left-1/2 -translate-x-1/2 blur-[1px]"></div>
            </div>
            
            {/* Tooltip ao passar o mouse */}
            <div className="absolute bottom-full mb-2 bg-white px-2 py-1 rounded shadow-md text-[10px] font-bold text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {order.customer_name}
            </div>
          </div>
        );
      })}

      {/* Botão de Centralizar (Visual) */}
      <button className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md text-gray-600 hover:text-blue-600">
        <MapPin size={20} />
      </button>
    </div>
  );
}