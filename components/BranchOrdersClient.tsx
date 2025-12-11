'use client';

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import ProfileOrdersDay from "./ProfileOrdersDay";
import { OrderUI } from "./OrderCard";
import { OrderWithUser } from "@/types";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BranchOrdersClientProps {
  orders: OrderWithUser[];
  branchId: number;
}

export default function BranchOrdersClient({ orders, branchId }: BranchOrdersClientProps) {
  const router = useRouter();

  // Função para traduzir o status do banco para o texto da UI
  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      'PENDING': 'Pendente',
      'PAID': 'Pago',
      'CONFIRMED': 'Confirmado',
      'EM_PRODUCAO': 'Em separação',
      'A_CAMINHO': 'Saiu para entrega',
      'DELIVERED': 'Entregue',
      'FINISHED': 'Finalizado',
      'CANCELED': 'Cancelado'
    };
    return map[status] || status;
  };

  // Função para formatar o subtexto (ex: "Chegada: 18:35")
  const getSubText = (status: string, dateStr: string) => {
    const date = parseISO(dateStr);
    const time = format(date, "HH:mm");
    
    if (status === 'DELIVERED' || status === 'FINISHED') return `Entregue às ${time}`;
    if (status === 'CANCELED') return `Cancelado às ${time}`;
    return `Horário do pedido: ${time}`;
  };

  // Agrupamento dos pedidos por dia
  const groupedOrders = orders.reduce((acc, order) => {
    const date = parseISO(order.dAt);
    const dateKey = format(date, "d MMM", { locale: ptBR });
    // Capitaliza a primeira letra do mês (out -> Out)
    const formattedDateKey = dateKey.split(' ').map((w, i) => i === 1 ? w.charAt(0).toUpperCase() + w.slice(1) : w).join(' ');

    if (!acc[formattedDateKey]) {
      acc[formattedDateKey] = [];
    }

    acc[formattedDateKey].push({
      id: order.id,
      statusText: getStatusText(order.status),
      subText: getSubText(order.status, order.dAt),
      price: order.totalPrice
    });

    return acc;
  }, {} as Record<string, OrderUI[]>);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Header Simples */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-30 flex items-center gap-3 shadow-sm">
        <button 
          onClick={() => router.back()} 
          className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-none">Pedidos da Filial</h1>
          <p className="text-xs text-gray-400 mt-0.5">Filial ID: {branchId}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-col gap-2">
          {Object.entries(groupedOrders).map(([date, items]) => (
            <ProfileOrdersDay 
              key={date} 
              dateLabel={date} 
              orders={items} 
            />
          ))}

          {orders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center px-4">
              <p className="text-sm font-medium">Nenhum pedido encontrado para esta filial.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}