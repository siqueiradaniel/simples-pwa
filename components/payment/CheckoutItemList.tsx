'use client';

import { CartItem } from "@/types";

export default function CheckoutItemList({ items }: { items: CartItem[] }) {
  return (
    <div className="mt-8 mb-6">
      <h3 className="text-sm font-bold text-blue-900 mb-4 px-1">Itens de compra <span className="text-gray-400 font-normal text-xs ml-1">{items.length} itens</span></h3>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.product_id} className="bg-white p-3 rounded-xl border border-gray-100 flex gap-3 items-center">
            {/* Imagem Pequena */}
            <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center shrink-0 p-1">
              <img 
                src={item.image_url || 'https://placehold.co/100x100?text=Prod'} 
                alt={item.name} 
                className="w-full h-full object-contain mix-blend-multiply" 
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-gray-800 truncate">{item.name}</h4>
              <p className="text-[10px] text-gray-400">{item.unit}</p>
            </div>

            <div className="text-right">
              <span className="block text-xs font-bold text-blue-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.unit_price)}
              </span>
              <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                {item.quantity} un
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}