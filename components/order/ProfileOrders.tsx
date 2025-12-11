'use client';

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import ProfileOrdersDay from "./ProfileOrdersDay";
import { OrderUI } from "@/components/order/OrderCard";
import { OrderWithUser } from "@/types";

interface ProfileOrdersProps {
  orders: OrderWithUser[];
}

export default function ProfileOrders({ orders }: ProfileOrdersProps) {
  
  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      'PENDING': 'Pagamento Pendente',
      'PAID': 'Pagamento Confirmado',
      'FINISHED': 'Compra Finalizada',
      'CANCELED': 'Compra Cancelada',
      'CURRENT': 'Compra Atual'
    };
    return map[status] || status;
  };

  const getSubText = (status: string, dateStr: string) => {
    const date = parseISO(dateStr);
    const time = format(date, "HH:mm");
    
    if (status === 'FINISHED') return `Entregue: ${time}`;
    if (status === 'CANCELED') return `Cancelada: ${time}`;
    return `Horário: ${time}`;
  };

  // Agrupa pedidos por dia (ex: "21 Out")
  const groupedOrders = orders.reduce((acc, order) => {
    const date = parseISO(order.dAt);
    const dateKey = format(date, "d MMM", { locale: ptBR });
    // Capitaliza o mês (out -> Out)
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
    <div className="mt-6">
      <h2 className="text-lg font-bold text-blue-900 px-4 mb-2">Pedidos</h2>
      
      <div className="flex flex-col gap-2">
        {Object.entries(groupedOrders).map(([date, items]) => (
          <ProfileOrdersDay 
            key={date} 
            dateLabel={date} 
            orders={items} 
          />
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">
            Você ainda não possui pedidos.
          </p>
        )}
      </div>
    </div>
  );
}