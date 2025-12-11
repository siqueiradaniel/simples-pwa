'use client';

import { ChevronLeft, Clock, CheckCircle2, XCircle, Truck, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface OrderHeaderProps {
  status: string;
  orderNumber: number;
  date: string;
}

export default function OrderHeader({ status, orderNumber, date }: OrderHeaderProps) {
  const router = useRouter();

  // Configuração visual dos status
  const statusConfig: Record<string, { color: string, bg: string, icon: any, label: string }> = {
    'PENDING': { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock, label: 'Pendente' },
    'PAID': { color: 'text-blue-600', bg: 'bg-blue-50', icon: CheckCircle2, label: 'Pago' },
    'EM_PRODUCAO': { color: 'text-purple-600', bg: 'bg-purple-50', icon: Package, label: 'Em Separação' },
    'A_CAMINHO': { color: 'text-orange-600', bg: 'bg-orange-50', icon: Truck, label: 'A Caminho' },
    'DELIVERED': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle2, label: 'Entregue' },
    'FINISHED': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle2, label: 'Finalizado' },
    'CANCELED': { color: 'text-red-600', bg: 'bg-red-50', icon: XCircle, label: 'Cancelado' },
  };

  const config = statusConfig[status] || statusConfig['PENDING'];
  const StatusIcon = config.icon;
  const formattedDate = format(parseISO(date), "d 'de' MMMM, HH:mm", { locale: ptBR });

  return (
    <div className="bg-white px-4 py-3 sticky top-0 z-30 border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={() => router.back()} 
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm font-bold text-gray-900">Pedido #{orderNumber}</span>
        <div className="w-8"></div>
      </div>

      <div className={`flex items-center justify-between p-3 rounded-xl ${config.bg}`}>
        <div className="flex items-center gap-2">
          <StatusIcon size={18} className={config.color} />
          <span className={`text-sm font-bold ${config.color}`}>{config.label}</span>
        </div>
        <span className="text-xs text-gray-500 font-medium">{formattedDate}</span>
      </div>
    </div>
  );
}