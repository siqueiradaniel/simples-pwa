'use client';

import { useState } from "react";
import { ChevronLeft, QrCode, CreditCard, Wallet, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import CheckoutStepper from "@/components/CheckoutStepper";
import PaymentMethodOption from "./payment/PaymentMethodOption";
import PixPaymentForm from "./payment/PixPaymentForm";
import CreditCardForm from "./payment/CreditCardForm";
import CheckoutItemList from "./payment/CheckoutItemList";
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

  const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice);

  const handleFinish = async () => {
    if (!selectedMethod) return;

    setIsFinishing(true);
    try {
      await finishOrder(orderId, selectedMethod, {});
      alert("Pedido realizado com sucesso!");
      router.push('/orders/' + orderId); // Vai para detalhes do pedido finalizado
    } catch (error) {
      console.error(error);
      alert("Erro ao finalizar pedido.");
      setIsFinishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-32">
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

      {/* Footer Fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-end mb-4 px-2">
          <span className="text-sm font-bold text-gray-900">Total a pagar</span>
          <span className="text-xl font-extrabold text-gray-900">{formattedTotal}</span>
        </div>

        <button
          onClick={handleFinish}
          disabled={!selectedMethod || isFinishing}
          className="w-full bg-blue-900 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-blue-800"
        >
          {isFinishing && <Loader2 size={18} className="animate-spin" />}
          {isFinishing ? "Processando..." : "FINALIZAR PEDIDO"}
        </button>
      </div>
    </div>
  );
}