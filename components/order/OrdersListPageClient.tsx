'use client';

import ProfileOrders from "@/components/order/ProfileOrders";
import { OrderWithUser } from "@/types";
import { ShoppingBag } from "lucide-react";

export default function OrdersListPageClient({ orders }: { orders: OrderWithUser[] }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Header */}
      <div className="bg-cyan-500 border-b border-gray-100 px-4 py-4 sticky top-0 z-30 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-550 p-2 rounded-xl text-blue-600">
            <ShoppingBag size={20} />
          </div>
          <h1 className="text-lg font-bold text-white">Meus Pedidos</h1>
        </div>
        <span className="text-xs font-medium text-white bg-cyan-600 px-2 py-1 rounded-md">
          {orders.length} total
        </span>
      </div>

      {/* Lista Reutilizada */}
      <div className="p-4">
        <ProfileOrders orders={orders} />
      </div>
    </div>
  );
}