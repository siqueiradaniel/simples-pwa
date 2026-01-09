'use client';

import Link from "next/link";
import { ShoppingBag, ArrowLeft, PackageX } from "lucide-react";
import ProfileOrders from "@/components/order/ProfileOrders";
import { OrderWithUser } from "@/types";

export default function OrdersListPageClient({ orders }: { orders: OrderWithUser[] }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Header Fixo */}
      <div className="bg-cyan-500 sticky top-0 z-30 shadow-md">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-550 p-2 rounded-xl text-white backdrop-blur-sm">
              <ShoppingBag size={20} />
            </div>
            <h1 className="text-lg font-bold text-white">Meus Pedidos</h1>
          </div>
          
          {orders.length > 0 && (
            <span className="text-xs font-bold text-cyan-600 bg-white px-2 py-1 rounded-full shadow-sm">
              {orders.length}
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {orders.length > 0 ? (
          <div className="flex flex-col gap-4">
            <ProfileOrders orders={orders} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
            <div className="bg-gray-200 p-4 rounded-full mb-4">
                <PackageX size={48} className="text-gray-400" />
            </div>
            <h2 className="text-gray-900 font-semibold text-lg">Nenhum pedido ainda</h2>
            <p className="text-gray-500 text-sm mt-1 max-w-[200px]">
              Faça suas compras e acompanhe o status por aqui.
            </p>
            <Link 
              href="/"
              className="mt-6 text-cyan-600 font-semibold hover:underline"
            >
              Ir para o início
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}