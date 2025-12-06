'use client';

import { ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddressListHeader() {
  const router = useRouter();

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 border-b border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => router.back()} 
          className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm font-semibold text-gray-900">Meus Endereços</span>
      </div>
      
      <Link 
        href="/addresses/new" 
        className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors"
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}