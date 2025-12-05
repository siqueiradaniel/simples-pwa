'use client';

import OrderCard, { OrderUI } from "./OrderCard";

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
            <OrderCard order={order} />
          </div>
        ))}
      </div>
    </div>
  );
}