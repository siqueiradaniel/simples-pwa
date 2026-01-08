'use client';

import { useState, useEffect } from "react";
import { ChevronLeft, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserAddress } from "@/types";
import CheckoutStepper from "@/components/checkout/cart/CheckoutStepper";
import { updateOrderAddress, getCurrentOrder } from "@/lib/api/cart";
import { useCartStore } from "@/lib/store/cartStore";
import { toast } from "sonner";
import { useUserStore } from "@/lib/store/userStore";
import { getUserAddresses } from "@/lib/api/address";

import SelectableAddressCard from "@/components/checkout/address/SelectableAddressCard";
import CartFooter from "@/components/checkout/cart/CartFooter";

export default function CartAddressPageClient() {
  const router = useRouter();
  
  // 1. Estados Globais (Zustand)
  const { user, isLoading: isUserLoading } = useUserStore();
  const { items, orderId } = useCartStore();

  // 2. Estados Locais
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>(undefined);
  const [serverTotal, setServerTotal] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 3. Efeito para carregar dados
  useEffect(() => {
    // Se terminou de verificar auth e não tem usuário, redireciona
    if (!isUserLoading && !user) {
      router.push('/login?next=/checkout/address');
      return;
    }

    // Se temos usuário, carregamos os dados
    if (user && !isUserLoading) {
      const loadData = async () => {
        try {
          setIsLoadingData(true);
          
          // Busca endereços
          const addrList = await getUserAddresses(user.id);
          setAddresses(addrList);
          
          // Define seleção padrão (Default ou Primeiro da lista)
          const defaultAddr = addrList.find((a: any) => a.is_default)?.address_id || addrList[0]?.address_id;
          if (defaultAddr) setSelectedAddressId(defaultAddr);

          // Se tivermos um ID de pedido, busca o total atual do servidor
          // (Útil caso o carrinho esteja vazio no zustand mas tenha valor no banco)
          if (orderId) {
            const orderData = await getCurrentOrder(orderId);
            setServerTotal(orderData?.total_price || 0);
          }
        } catch (error) {
          console.error("Erro ao carregar dados de checkout:", error);
          toast.error("Erro ao carregar informações.");
        } finally {
          setIsLoadingData(false);
        }
      };

      loadData();
    }
  }, [user, isUserLoading, orderId, router]);

  // 4. Lógica de Cálculo do Total
  // Prioriza o cálculo local (otimista) do Zustand, senão usa o do servidor
  const storeTotal = items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);
  const displayTotal = items.length > 0 ? storeTotal : serverTotal;

  // 5. Handler de Continuar
  const handleContinue = async () => {
    if (!selectedAddressId) {
      toast.success("Por favor, selecione um endereço de entrega.");
      return;
    }

    if (!orderId) {
      toast.error("Carrinho não encontrado.");
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

  // Renderização de Loading Inicial
  if (isUserLoading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-blue-600" size={32} />
          <p className="text-gray-500 text-sm font-medium">Carregando endereços...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-[200px]">
      {/* Header com Stepper Integrado */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="bg-cyan-500 px-4 pt-4 flex items-center pb-2">
          <button onClick={() => router.back()} className="p-2 -ml-2 text-white hover:bg-white/20 rounded-full transition-colors">
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
                key={addr.id} // Usando id único da tabela user_address ou address
                userAddress={addr}
                isSelected={selectedAddressId === addr.address_id}
                onSelect={() => setSelectedAddressId(addr.address_id)}
              />
            ))
          ) : (
            <div className="text-center py-10 px-6 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-sm mb-2">Você ainda não tem endereços cadastrados.</p>
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