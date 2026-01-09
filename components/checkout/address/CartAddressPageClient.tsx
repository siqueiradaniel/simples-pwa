'use client';

import { useState, useEffect } from "react";
import { ChevronLeft, Plus, Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { UserAddress } from "@/types";
import CheckoutStepper from "@/components/checkout/cart/CheckoutStepper";
import { updateOrderAddress, getCurrentOrder } from "@/lib/api/cart";
import { useCartStore } from "@/lib/store/cartStore";
import { useUserStore } from "@/lib/store/userStore";
import { getUserAddresses } from "@/lib/api/address";

import SelectableAddressCard from "@/components/checkout/address/SelectableAddressCard";
import CartFooter from "@/components/checkout/cart/CartFooter";

interface CartAddressPageClientProps {
  initialUser: any; // Recebe do servidor
}

export default function CartAddressPageClient({ initialUser }: CartAddressPageClientProps) {
  const router = useRouter();
  
  // 1. Estados Globais (Zustand)
  const { user, setUserState } = useUserStore();
  const { items, orderId } = useCartStore();

  // 2. Estados Locais
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>(undefined);
  const [serverTotal, setServerTotal] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Define o usuário atual (Prioridade: Store > Props do Servidor)
  const currentUser = user || { id: initialUser.id, email: initialUser.email };

  // 3. Hidratação e Carregamento de Dados
  useEffect(() => {
    // A. Hidrata o Zustand se necessário
    if (initialUser && !user) {
      setUserState({
        user: { id: initialUser.id, email: initialUser.email },
        profile: null, // Perfil carrega depois se precisar, aqui só precisamos do ID
        isLoading: false
      });
    }

    // B. Carrega dados da página (Endereços e Totais)
    const loadData = async () => {
      try {
        setIsLoadingData(true);
        
        // Busca endereços usando o ID garantido
        const addrList = await getUserAddresses(currentUser.id);
        setAddresses(addrList);
        
        // Lógica de seleção padrão
        const defaultAddr = addrList.find((a: any) => a.is_default)?.address_id || addrList[0]?.address_id;
        if (defaultAddr) setSelectedAddressId(defaultAddr);

        // Busca total do pedido no servidor (fallback se zustand estiver vazio)
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
    
    // REMOVIDO: O bloco "if (!user) router.push..." que causava o loop.
    // Dependências ajustadas para evitar re-execuções desnecessárias
  }, [initialUser, user, setUserState, orderId, currentUser.id]);

  // 4. Cálculo do Total
  const storeTotal = items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);
  const displayTotal = items.length > 0 ? storeTotal : serverTotal;

  // 5. Handler de Continuar
  const handleContinue = async () => {
    if (!selectedAddressId) {
      toast.success("Por favor, selecione um endereço de entrega.");
      return;
    }
    
    // Fallback de segurança se o orderId não estiver no Zustand
    if (!orderId) {
      toast.error("Carrinho não encontrado. Tente atualizar a página.");
      return;
    }

    setIsSaving(true);
    try {
      await updateOrderAddress(orderId, selectedAddressId);
      router.push('/checkout/payment');
      toast.success("Endereço selecionado!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao vincular endereço.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-blue-600" size={32} />
          <p className="text-gray-500 text-sm font-medium">A carregar endereços...</p>
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
        <h1 className="text-lg font-bold text-gray-900 mb-4 text-center">Onde vamos entregar?</h1>

        <div className="flex flex-col gap-3">
          {addresses.length > 0 ? (
            addresses.map((addr) => (
              <SelectableAddressCard
                key={addr.id}
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
        buttonText="IR PARA PAGAMENTO"
        isButtonDisabled={!selectedAddressId} 
      />
    </div>
  );
}