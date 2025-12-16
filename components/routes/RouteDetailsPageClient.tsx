'use client';

import { useRouter } from "next/navigation";
import { ChevronLeft, Truck, CheckCircle, Navigation } from "lucide-react";
import { OrderForRouting } from "@/types";
import Link from "next/link";
import { MapPin, User } from "lucide-react";
import RouteMap from "./RouteMap";

// Um card simplificado para exibição na rota (sem checkbox, pois já está na rota)
function RouteOrderCard({ order, index }: { order: OrderForRouting; index: number }) {
  return (
    <Link href={`/orders/${order.order_id}`}>
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-3 active:scale-[0.99] transition-transform">
        <div className="flex flex-col items-center gap-1 mt-1">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {index + 1}
          </div>
          <div className="w-0.5 h-full bg-gray-100 rounded-full"></div>
        </div>

        <div className="flex-1 min-w-0 pb-2">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-gray-800 text-sm">Pedido #{order.order_number}</h3>
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
              {order.status === 'A_CAMINHO' ? 'A Caminho' : order.status}
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
      </div>
    </Link>
  );
}

export default function RouteDetailsPageClient({ routeId, orders }: { routeId: number; orders: OrderForRouting[] }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      {/* Header Fixo */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()} 
              className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-none">Detalhes da Rota</h1>
              <p className="text-xs text-gray-400 mt-0.5">ID #{routeId}</p>
            </div>
          </div>
          <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Truck size={14} />
            Em Andamento
          </div>
        </div>
      </div>

      {/* Mapa */}
      <RouteMap orders={orders} />

      {/* Lista de Entregas */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Entregas ({orders.length})
          </h2>
          <button className="text-xs text-blue-600 font-bold flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
            <Navigation size={14} /> Iniciar Navegação
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {orders.map((order, index) => (
            <RouteOrderCard key={order.order_id} order={order} index={index} />
          ))}
        </div>

        {/* Botão de Finalizar Rota (Opcional, futuro) */}
        <div className="mt-8">
          <button className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            <CheckCircle size={20} />
            Finalizar Rota
          </button>
        </div>
      </div>
    </div>
  );
}