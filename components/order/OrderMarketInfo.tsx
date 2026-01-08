'use client';

import { Store } from "lucide-react";

interface OrderMarketInfoProps {
  name: string;
  logo_url: string | null;
  branchName: string;
}

export default function OrderMarketInfo({ name, logo_url, branchName }: OrderMarketInfoProps) {
  return (
    <div className="bg-white p-4 mb-2 flex items-center gap-4 border-b border-gray-100">
      <div className="w-12 h-12 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
        {logo_url ? (
          <img src={logo_url} alt={name} className="w-full h-full object-cover" />
        ) : (
          <Store size={20} className="text-gray-400" />
        )}
      </div>
      <div>
        <h2 className="font-bold text-gray-900 text-sm">{name}</h2>
        <p className="text-xs text-gray-500">{branchName}</p>
      </div>
    </div>
  );
}