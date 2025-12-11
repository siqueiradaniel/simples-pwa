'use client';

import { CheckCircle2, LucideIcon } from "lucide-react";

interface PaymentMethodOptionProps {
  id: string;
  label: string;
  icon: LucideIcon;
  isSelected: boolean;
  onSelect: () => void;
}

export default function PaymentMethodOption({ id, label, icon: Icon, isSelected, onSelect }: PaymentMethodOptionProps) {
  return (
    <div 
      onClick={onSelect}
      className={`relative cursor-pointer rounded-xl border p-4 flex items-center gap-4 transition-all duration-200 active:scale-[0.98] ${
        isSelected 
          ? 'bg-blue-50 border-blue-500 shadow-sm ring-1 ring-blue-500' 
          : 'bg-gray-50 border-transparent hover:bg-gray-100'
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
        isSelected ? 'bg-blue-500 text-white' : 'bg-white text-gray-400 border border-gray-200'
      }`}>
        <Icon size={20} strokeWidth={2} />
      </div>

      <span className={`flex-1 font-semibold text-sm ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>
        {label}
      </span>

      {isSelected && (
        <CheckCircle2 size={20} className="text-blue-600" />
      )}
    </div>
  );
}