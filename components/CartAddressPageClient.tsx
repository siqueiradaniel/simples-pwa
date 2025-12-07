'use client';

import { useState } from "react";
import { ChevronLeft, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserAddress } from "@/types";
import CheckoutStepper from "./CheckoutStepper";
import SelectableAddressCard from "./SelectableAddressCard";
import { updateOrderAddress } from "@/lib/api/cart";

interface CartAddressPageClientProps {
  addresses: UserAddress[];
  orderId: number;
  totalPrice: number;
}

export default function CartAddressPageClient({ addresses, orderId, totalPrice }: CartAddressPageClientProps) {
  const router = useRouter();
  
  // Seleciona o endereço padrão ou o primeiro da lista
  const defaultSelection = addresses.find(a => a.is_default)?.id || addresses[0]?.address_id;
  const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>(defaultSelection);
  const [isSaving, setIsSaving] = useState(false);

  const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice);

  const handleContinue = async () => {
    if (!selectedAddressId) {
      alert("Por favor, selecione um endereço de entrega.");
      return;
    }

    setIsSaving(true);
    try {
      await updateOrderAddress(orderId, selectedAddressId);
      // Próximo passo: Pagamento
      router.push('/checkout/payment');
      alert("Endereço vinculado! Próximo passo: Pagamento (Em breve)");
    } catch (error) {
      console.error(error);
      alert("Erro ao selecionar endereço. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-32">
      {/* Header com Stepper Integrado */}
      <div className="bg-white">
        <div className="px-4 pt-4 flex items-center mb-2">
          <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <span className="ml-2 font-bold text-gray-700">Checkout</span>
        </div>
        <CheckoutStepper currentStep={2} />
      </div>

      <div className="px-4">
        <h1 className="text-lg font-bold text-gray-900 mb-4 text-center">Selecione o endereço</h1>

        <div className="flex flex-col gap-3">
          {addresses.length > 0 ? (
            addresses.map((addr) => (
              <SelectableAddressCard
                key={addr.id}
                userAddress={addr}
                isSelected={selectedAddressId === addr.address_id} // Verifica pelo address_id físico
                onSelect={() => setSelectedAddressId(addr.address_id)}
              />
            ))
          ) : (
            <div className="text-center py-10 text-gray-500 text-sm bg-white rounded-xl border border-dashed border-gray-300">
              Nenhum endereço cadastrado.
            </div>
          )}

          {/* Botão Adicionar Novo Endereço */}
          <Link 
            href="/addresses/new"
            className="mt-2 w-full py-4 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-500 font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all active:scale-[0.98]"
          >
            <Plus size={20} />
            Adicionar novo endereço
          </Link>
        </div>
      </div>

      {/* Footer Fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-end mb-4 px-2">
          <span className="text-sm font-bold text-gray-900">Total a pagar</span>
          <span className="text-xl font-extrabold text-gray-900">{formattedTotal}</span>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedAddressId || isSaving}
          className="w-full bg-blue-900 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-blue-800"
        >
          {isSaving && <Loader2 size={18} className="animate-spin" />}
          {isSaving ? "Processando..." : "CONTINUAR PARA PAGAMENTO"}
        </button>
      </div>
    </div>
  );
}