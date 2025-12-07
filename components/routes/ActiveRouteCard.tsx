'use client';

import { Truck, Map, Clock, ChevronRight } from "lucide-react";
import { ActiveRouteSummary } from "@/types";

export default function ActiveRouteCard({ route }: { route: ActiveRouteSummary }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:border-blue-300 transition-all">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <Truck size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Rota #{route.route_id}</h3>
            <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded uppercase">
              Em andamento
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="block text-xs text-gray-500">Entregas</span>
          <span className="font-bold text-gray-900 text-sm">{route.deliveries_count}</span>
        </div>
      </div>

      <div className="flex gap-4 border-t border-gray-50 pt-3">
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-gray-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase">Estimado</span>
            <span className="text-xs font-semibold text-gray-700">{route.estimated_time} min</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          <Map size={14} className="text-gray-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase">Distância</span>
            <span className="text-xs font-semibold text-gray-700">{route.estimated_distance} km</span>
          </div>
        </div>
      </div>

      <div className="mt-3 bg-gray-50 rounded-lg p-2 text-xs text-gray-500 flex justify-between items-center">
        <span className="truncate max-w-[200px]">{route.neighborhoods || 'Vários bairros'}</span>
        <ChevronRight size={14} />
      </div>
    </div>
  );
}