'use client';

import OrderCard, { OrderUI } from "./OrderCard";
import Link from "next/link";

interface ProfileOrdersDayProps {
  dateLabel: string;
  orders: OrderUI[];
}

export default function ProfileOrdersDay({ dateLabel, orders }: ProfileOrdersDayProps) {
  return (
    <div className="mb-4">
      <h3 className="text-xs text-gray-500 font-medium px-4 mb-1">{dateLabel}</h3>
      <div className="bg-white border-t border-b border-gray-100 px-4">
        {orders.map((order, index) => (
          <div key={order.id} className={index !== orders.length - 1 ? "border-b border-gray-50" : ""}>
            {/* Envolvemos o OrderCard com Link. 
              'block' garante que o Link ocupe a largura total disponível.
              'active:opacity-70' dá um feedback visual ao toque.
            */}
            <Link href={`/orders/${order.id}`} className="block w-full active:opacity-70 transition-opacity">
              <OrderCard order={order} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}