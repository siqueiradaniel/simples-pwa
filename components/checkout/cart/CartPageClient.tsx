'use client';

import { useState } from "react";
import { ChevronLeft, Trash2, ShoppingCart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import CartItemCard from "./CartItemCard";
import CartFooter from "./CartFooter"; 
import CheckoutStepper from "@/components/checkout/cart/CheckoutStepper";
import { useCartStore } from "@/lib/store/cartStore";

interface CartPageClientProps {
  orderId: number;
  minOrderValue: number;
}

export default function CartPageClient({ orderId, minOrderValue }: CartPageClientProps) {
  const router = useRouter();
  
  // Acessa o estado global do carrinho
  const { items, updateItemQuantity, clearCart, isLoading: isCartLoading } = useCartStore();
  
  const [isNavigating, setIsNavigating] = useState(false);

  // Cálculo do total no cliente (instantâneo)
  const total = items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);
  const isMinOrderReached = total >= minOrderValue;

  const handleUpdateQuantity = (productId: number, delta: number) => {
    const item = items.find(i => i.product_id === productId);
    if (item) {
      const newQty = Math.max(1, item.quantity + delta);
      updateItemQuantity(productId, newQty);
    }
  };

  const handleRemove = (productId: number) => {
    // Usamos o toast "promise" ou confirmação simples, aqui vai confirmação nativa por simplicidade e segurança
    if (confirm("Remover este item do carrinho?")) {
      updateItemQuantity(productId, 0);
    }
  };

  const handleClearCart = () => {
    if (confirm("Deseja limpar todo o carrinho?")) {
      clearCart(); 
      toast.success("Carrinho limpo.");
    }
  };

  const handleConfirm = async () => {
    if (!isMinOrderReached) {
      toast.error(`O pedido mínimo é de R$ ${minOrderValue.toFixed(2).replace('.', ',')}`);
      return;
    }
    
    setIsNavigating(true);
    // Pequeno delay para feedback visual no botão antes de navegar
    await new Promise(resolve => setTimeout(resolve, 300));
    router.push('/checkout/address'); 
  };

  if (isCartLoading && items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-cyan-600" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-[200px]">
      {/* Header com Stepper */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="bg-cyan-500 px-4 pt-4 flex items-center justify-between pb-2">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="p-2 -ml-2 text-white hover:bg-white/20 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </button>
            <span className="ml-2 font-bold text-white">Carrinho</span>
          </div>
        </div>
        <CheckoutStepper currentStep={1} />
      </div>

      {/* Título e Ações */}
      <div className="px-4 mt-6 flex justify-between items-center">
        <h1 className="font-bold text-gray-900 text-lg">
          Itens ({items.length})
        </h1>
        {items.length > 0 && (
          <button 
            onClick={handleClearCart}
            className="text-xs text-red-500 font-medium flex items-center gap-1 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-red-100"
          >
            Limpar lista <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* Lista de Itens */}
      <div className="px-4 mt-4 flex flex-col gap-3">
        {items.length > 0 ? (
          items.map(item => (
            <CartItemCard 
              key={item.product_id} 
              item={item} 
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white mx-4 rounded-2xl border border-dashed border-gray-200 mt-4">
            <ShoppingCart size={48} className="mb-4 opacity-20 text-gray-500" />
            <p className="font-medium text-gray-500">Seu carrinho está vazio.</p>
            <button 
              onClick={() => router.push('/')}
              className="mt-4 text-cyan-600 text-sm font-semibold hover:underline"
            >
              Ir às compras
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <CartFooter 
        total={total}
        minOrderValue={minOrderValue}
        onNext={handleConfirm}
        isLoading={isNavigating}
        buttonText="CONFIRMAR ENDEREÇO"
        isButtonDisabled={items.length === 0}
      />
    </div>
  );
}