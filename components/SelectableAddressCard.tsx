'use client';

import { Home, Briefcase, MapPin, CheckCircle2 } from "lucide-react";
import { UserAddress } from "@/types";

interface SelectableAddressCardProps {
  userAddress: UserAddress;
  isSelected: boolean;
  onSelect: () => void;
}

export default function SelectableAddressCard({ userAddress, isSelected, onSelect }: SelectableAddressCardProps) {
  const { address, label } = userAddress;

  const getIcon = () => {
    const l = label.toLowerCase();
    if (l.includes('casa')) return Home;
    if (l.includes('trabalho')) return Briefcase;
    return MapPin;
  };

  const Icon = getIcon();

  if (!address) return null;

  return (
    <div 
      onClick={onSelect}
      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 active:scale-[0.98] ${
        isSelected 
          ? 'bg-blue-50 border-blue-500 shadow-md' 
          : 'bg-white border-gray-100 hover:border-blue-200 shadow-sm'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Ícone */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
          isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'
        }`}>
          <Icon size={24} strokeWidth={2} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-base mb-1 ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
            {label}
          </h3>
          <p className="text-sm text-gray-600 leading-snug">
            {address.street}, {address.number}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {address.neighborhood} - {address.city}/{address.state}
          </p>
        </div>

        {/* Checkbox Visual */}
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
        }`}>
          {isSelected && <CheckCircle2 size={16} className="text-white" />}
        </div>
      </div>
    </div>
  );
}