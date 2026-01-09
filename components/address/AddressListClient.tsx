'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

import AddressListHeader from "./AddressListHeader";
import AddressCard from "./AddressCard";
import { UserAddress } from "@/types";
import { useUserStore } from "@/lib/store/userStore";
import { getUserAddresses } from "@/lib/api/address";

export default function AddressListClient() {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUserStore();
  
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // 1. Redirecionamento se não autenticado
    if (!isUserLoading && !user) {
      router.push('/login?next=/addresses');
      return;
    }

    // 2. Busca dados se autenticado
    if (user && !isUserLoading) {
      const fetchAddresses = async () => {
        try {
          // Agora chama a API atualizada que aceita UUID
          const data = await getUserAddresses(user.id);
          setAddresses(data);
        } catch (error) {
          console.error("Erro ao buscar endereços:", error);
          toast.error("Não foi possível carregar seus endereços.");
        } finally {
          setIsLoadingData(false);
        }
      };

      fetchAddresses();
    }
  }, [user, isUserLoading, router]);

  // Loading State
  if (isUserLoading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="animate-spin text-blue-600" size={32} />
          <p className="text-gray-500 text-sm">Carregando endereços...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
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