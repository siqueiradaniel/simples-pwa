'use client';

import { useState } from "react";
import { ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserAddress } from "@/types";
import CheckoutStepper from "@/components/checkout/cart/CheckoutStepper";
import { updateOrderAddress } from "@/lib/api/cart";
import { useCartStore } from "@/lib/store/cartStore"; // Zustand importado
import { toast } from "sonner";
import SelectableAddressCard from "@/components/checkout/address/SelectableAddressCard";
import CartFooter from "@/components/checkout/cart/CartFooter";

interface CartAddressPageClientProps {
  addresses: UserAddress[];
  orderId: number;
  totalPrice: number;
}

export default function CartAddressPageClient({ addresses, orderId, totalPrice }: CartAddressPageClientProps) {
  const router = useRouter();
  
  // Zustand: recupera itens para cálculo dinâmico do total
  const items = useCartStore(state => state.items);

  // Seleciona o endereço padrão ou o primeiro da lista
  const defaultSelection = addresses.find(a => a.is_default)?.id || addresses[0]?.address_id;
  const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>(defaultSelection);
  const [isSaving, setIsSaving] = useState(false);

  // Cálculo do total:
  // Usa o total do Zustand (cliente) se houver itens, senão usa o initial (SSR)
  const storeTotal = items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);
  const displayTotal = items.length > 0 ? storeTotal : totalPrice;

  const handleContinue = async () => {
    if (!selectedAddressId) {
      toast.success("Por favor, selecione um endereço de entrega.");
      return;
    }

    setIsSaving(true);
    try {
      await updateOrderAddress(orderId, selectedAddressId);
      // Próximo passo: Pagamento
      router.push('/checkout/payment');
      toast.success("Endereço vinculado!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao selecionar endereço. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-[200px]">
      {/* Header com Stepper Integrado */}
      <div className="bg-white">
        <div className="bg-cyan-500 px-4 pt-4 flex items-center pb-2">
          <button onClick={() => router.back()} className="p-2 -ml-2 text-white hover:bg-gray-50 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <span className="ml-2 font-bold text-white">Checkout</span>
        </div>
        <CheckoutStepper currentStep={2} />
      </div>

      <div className="px-4 mt-6">
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

      {/* Footer Reutilizado */}
      <CartFooter 
        total={displayTotal}
        onNext={handleContinue}
        isLoading={isSaving}
        buttonText="CONTINUAR PARA PAGAMENTO"
        isButtonDisabled={!selectedAddressId} 
      />
    </div>
  );
}