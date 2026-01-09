'use client';

import { useState } from "react";
import { ChevronLeft, QrCode, CreditCard, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import CheckoutStepper from "@/components/checkout/cart/CheckoutStepper";
import PaymentMethodOption from "./PaymentMethodOption";
import PixPaymentForm from "./PixPaymentForm";
import CreditCardForm from "./CreditCardForm";
import CheckoutItemList from "./CheckoutItemList";
import CartFooter from "@/components/checkout/cart/CartFooter";

import { CartItem } from "@/types";
import { finishOrder } from "@/lib/api/payment";
import { useCartStore } from "@/lib/store/cartStore";

interface CartPaymentPageClientProps {
  orderId: number;
  totalPrice: number;
  items: CartItem[];
}

export default function CartPaymentPageClient({ orderId, totalPrice, items }: CartPaymentPageClientProps) {
  const router = useRouter();
  
  // Zustand: Para limpar o carrinho localmente após o sucesso
  const clearCart = useCartStore(state => state.clearCart);

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);

  const handleFinish = async () => {
    if (!selectedMethod) {
      toast.error('Selecione uma forma de pagamento para continuar.') 
      return;
    }

    setIsFinishing(true);
    try {
      // 1. Chama a Server Action
      await finishOrder(orderId, selectedMethod);
      
      // 2. Limpa o estado global do carrinho no cliente (Zustand)
      // Isso evita que o carrinho pareça "cheio" se o usuário voltar para a home
      clearCart();

      // 3. Redireciona para sucesso
      router.push(`/checkout/success/${orderId}`);
      toast.success("Pedido realizado com sucesso!");

    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao processar seu pedido. Tente novamente.");
      setIsFinishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-[200px]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="bg-cyan-500 px-4 pt-4 flex items-center pb-2">
          <button onClick={() => router.back()} className="p-2 -ml-2 text-white hover:bg-white/20 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <span className="ml-2 font-bold text-white">Pagamento</span>
        </div>
        <CheckoutStepper currentStep={3} />
      </div>

      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Como deseja pagar?</h2>

        <div className="flex flex-col gap-3">
          <PaymentMethodOption 
            id="pix"
            label="Pix (Aprovação imediata)"
            icon={QrCode}
            isSelected={selectedMethod === 'pix'}
            onSelect={() => setSelectedMethod('pix')}
          />
          {selectedMethod === 'pix' && <PixPaymentForm />}

          <PaymentMethodOption 
            id="credit_card"
            label="Cartão de Crédito"
            icon={CreditCard}
            isSelected={selectedMethod === 'credit_card'}
            onSelect={() => setSelectedMethod('credit_card')}
          />
          {selectedMethod === 'credit_card' && <CreditCardForm type="credit" />}

          <PaymentMethodOption 
            id="voucher"
            label="Vale Alimentação"
            icon={Wallet}
            isSelected={selectedMethod === 'voucher'}
            onSelect={() => setSelectedMethod('voucher')}
          />
          {selectedMethod === 'voucher' && <CreditCardForm type="voucher" />}
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 px-1">Resumo do Pedido</h3>
          <CheckoutItemList items={items} />
        </div>
      </div>

      {/* Footer Fixo Padronizado */}
      <CartFooter 
        total={totalPrice}
        onNext={handleFinish}
        isLoading={isFinishing}
        buttonText="FINALIZAR PEDIDO"
        isButtonDisabled={!selectedMethod}
      />
    </div>
  );
}