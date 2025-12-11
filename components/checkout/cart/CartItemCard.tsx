'use client';

import { Trash2, Plus, Minus } from "lucide-react";
import { CartItem } from "@/types";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.unit_price);

  return (
    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex gap-3 relative">
      {/* Botão de Remover (Canto Superior Direito) */}
      <button 
        onClick={() => onRemove(item.product_id)}
        className="absolute top-2 right-2 text-gray-300 hover:text-red-500 p-1 transition-colors"
      >
        <Trash2 size={14} />
      </button>

      {/* Imagem */}
      <div className="w-20 h-20 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center shrink-0 p-1">
        <img 
          src={item.image_url || 'https://placehold.co/100x100?text=Prod'} 
          alt={item.name} 
          className="w-full h-full object-contain mix-blend-multiply" 
        />
      </div>

      <div className="flex-1 flex flex-col justify-between py-0.5">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2 pr-6">
            {item.name}
          </h3>
          <p className="text-[10px] text-gray-400 mt-0.5">{item.unit}</p>
        </div>

        <div className="flex items-end justify-between mt-2">
          <span className="text-sm font-bold text-cyan-600">{formattedPrice}</span>

          {/* Controles de Quantidade */}
          <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100 h-8">
            <button 
              onClick={() => onUpdateQuantity(item.product_id, -1)}
              className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-cyan-600 active:bg-gray-100 rounded-l-lg disabled:opacity-50"
              disabled={item.quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <div className="w-8 flex items-center justify-center text-xs font-bold text-gray-900 border-x border-gray-100 bg-white h-full">
              {item.quantity}
            </div>
            <button 
              onClick={() => onUpdateQuantity(item.product_id, 1)}
              className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-cyan-600 active:bg-gray-100 rounded-r-lg"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}