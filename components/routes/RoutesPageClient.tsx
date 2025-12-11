'use client';

import { useState } from "react";
import { Plus, Map as MapIcon, List, Navigation } from "lucide-react";
import RouteMap from "./RouteMap";
import PendingOrderCard from "./PendingOrderCard";
import ActiveRouteCard from "./ActiveRouteCard";
import { OrderForRouting, ActiveRouteSummary } from "@/types";

interface RoutesPageClientProps {
  pendingOrders: OrderForRouting[];
  activeRoutes: ActiveRouteSummary[];
}

export default function RoutesPageClient({ pendingOrders, activeRoutes }: RoutesPageClientProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'active'>('create');
  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);

  const toggleOrderSelection = (id: number) => {
    setSelectedOrderIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-blue-900 flex items-center gap-2">
            <Navigation size={20} />
            Logística
          </h1>
          
          {/* Tabs Switcher */}
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('create')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === 'create' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Planejar
            </button>
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === 'active' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Em Rota ({activeRoutes.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'create' ? (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          {/* Mapa no Topo */}
          <RouteMap orders={pendingOrders} />

          <div className="px-4 py-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Pendentes ({pendingOrders.length})
              </h2>
              {selectedOrderIds.length > 0 && (
                <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-full">
                  {selectedOrderIds.length} selecionados
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3 pb-20">
              {pendingOrders.map((order, index) => (
                <PendingOrderCard 
                  key={order.order_id} 
                  order={order}
                  index={index}
                  isSelected={selectedOrderIds.includes(order.order_id)}
                  onToggle={() => toggleOrderSelection(order.order_id)}
                />
              ))}
              
              {pendingOrders.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <p>Sem pedidos pendentes para rota.</p>
                </div>
              )}
            </div>
          </div>

          {/* Floating Action Button (Criar Rota) */}
          {selectedOrderIds.length > 0 && (
            <div className="fixed bottom-24 left-4 right-4 z-40">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                <Plus size={20} />
                Criar Rota com {selectedOrderIds.length} pedidos
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="px-4 py-4 animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="flex flex-col gap-4">
            {activeRoutes.map(route => (
              <ActiveRouteCard key={route.route_id} route={route} />
            ))}

            {activeRoutes.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <TruckIcon />
                </div>
                <p className="text-sm font-medium">Nenhuma rota ativa.</p>
                <p className="text-xs mt-1">Crie uma nova rota na aba "Planejar".</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TruckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
  )
}