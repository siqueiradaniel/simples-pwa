'use client';

import { OrderItem } from "@/types";

export default function OrderItemsList({ items }: { items: OrderItem[] }) {
  const formatMoney = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="bg-white p-4 mb-2 border-y border-gray-100">
      <h3 className="text-xs font-bold text-gray-900 uppercase mb-3 tracking-wide">Itens do Pedido</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.product_id} className="flex justify-between items-start">
            <div className="flex gap-2">
              <span className="text-sm font-bold text-gray-500 w-5">{item.quantity}x</span>
              <div className="flex flex-col">
                <span className="text-sm text-gray-800 font-medium leading-tight">{item.product_name}</span>
                <span className="text-[10px] text-gray-400">{item.product_unit}</span>
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-700">{formatMoney(item.subtotal)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}