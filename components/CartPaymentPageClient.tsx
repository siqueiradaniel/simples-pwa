'use client';

import { useState } from "react";
import { ChevronLeft, QrCode, CreditCard, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import CheckoutStepper from "@/components/CheckoutStepper";
import PaymentMethodOption from "./payment/PaymentMethodOption";
import PixPaymentForm from "./payment/PixPaymentForm";
import CreditCardForm from "./payment/CreditCardForm";
import CheckoutItemList from "./payment/CheckoutItemList";
import CartFooter from "./CartFooter"; // Importando o footer padronizado
import { CartItem } from "@/types";
import { finishOrder } from "@/lib/api/payment";

interface CartPaymentPageClientProps {
  orderId: number;
  totalPrice: number;
  items: CartItem[];
}

export default function CartPaymentPageClient({ orderId, totalPrice, items }: CartPaymentPageClientProps) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);

  const handleFinish = async () => {
    if (!selectedMethod) return;

    setIsFinishing(true);
    try {
      await finishOrder(orderId, selectedMethod, {});
      // Redireciona para a tela de sucesso em vez de detalhes diretos
      router.push(`/checkout/success/${orderId}`);
    } catch (error) {
      console.error(error);
      alert("Erro ao finalizar pedido.");
      setIsFinishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-[200px]">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 pt-4 flex items-center mb-2">
          <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <span className="ml-2 font-bold text-gray-700">Pagamento</span>
        </div>
        <CheckoutStepper currentStep={3} />
      </div>

      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Como deseja pagar?</h2>

        <div className="flex flex-col gap-3">
          <PaymentMethodOption 
            id="pix"
            label="Pix"
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

        <CheckoutItemList items={items} />
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