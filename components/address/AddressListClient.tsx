'use client';

import AddressListHeader from "./AddressListHeader";
import AddressCard from "./AddressCard";
import { UserAddress } from "@/types";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default function AddressListClient({ addresses }: { addresses: UserAddress[] }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      <AddressListHeader />

      <div className="p-4 flex flex-col gap-4">
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <AddressCard key={addr.id} userAddress={addr} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <MapPin size={32} />
            </div>
            <h2 className="text-gray-900 font-semibold">Sem endereços</h2>
            <p className="text-gray-500 text-sm mt-1 max-w-xs">
              Você ainda não cadastrou nenhum endereço de entrega.
            </p>
            <Link 
              href="/addresses/new"
              className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Adicionar Endereço
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}