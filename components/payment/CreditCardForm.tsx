'use client';

import { CreditCard, Calendar, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CreditCardForm({ type }: { type: 'credit' | 'voucher' }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mt-4 animate-in fade-in slide-in-from-top-2 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-gray-900">
          Dados do {type === 'credit' ? 'Cartão de Crédito' : 'Vale Alimentação'}
        </h3>
        <div className="flex gap-1 opacity-50 grayscale">
           {/* Ícones de bandeiras placeholder */}
           <div className="w-6 h-4 bg-gray-200 rounded"></div>
           <div className="w-6 h-4 bg-gray-200 rounded"></div>
           <div className="w-6 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-500 uppercase">Número do Cartão</label>
          <div className="relative">
            <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="0000 0000 0000 0000" 
              className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-blue-500 font-mono text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-500 uppercase">Nome do Titular</label>
          <Input 
            placeholder="Como está impresso no cartão" 
            className="bg-gray-50 border-gray-200 focus-visible:ring-blue-500 text-sm uppercase"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase">Validade</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="MM/AA" 
                className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-blue-500 font-mono text-sm"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
              CVV <span className="text-gray-300 font-normal normal-case">(Código de segurança)</span>
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="123" 
                maxLength={4}
                className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-blue-500 font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {type === 'credit' && (
          <div className="pt-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Parcelamento</label>
            <select className="w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>1x sem juros</option>
              <option>2x sem juros</option>
              <option>3x sem juros</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}