'use client';

import { useState } from "react";
import { ChevronLeft, Trash2, ShoppingCart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import CartItemCard from "./CartItemCard";
import CartFooter from "./CartFooter"; 
import { useCartStore } from "@/lib/store/cartStore";
import CheckoutStepper from "@/components/CheckoutStepper";

interface CartPageClientProps {
  orderId: number;
  minOrderValue: number;
}

export default function CartPageClient({ orderId, minOrderValue }: CartPageClientProps) {
  const router = useRouter();
  
  const items = useCartStore(state => state.items);
  const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
  const clearCart = useCartStore(state => state.clearCart);
  
  const [isSaving, setIsSaving] = useState(false);

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
    if (confirm("Remover este item do carrinho?")) {
      updateItemQuantity(productId, 0);
    }
  };

  const handleClearCart = () => {
    if (confirm("Deseja limpar todo o carrinho?")) {
      clearCart(); 
    }
  };

  const handleConfirm = async () => {
    if (!isMinOrderReached) return;
    setIsSaving(true);
    // Simula delay de salvamento/sincronização antes de navegar
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push('/checkout/address'); 
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-[200px]">
      {/* Header com Stepper (Padrão Checkout) */}
      <div className="bg-white">
        <div className="bg-cyan-500 px-4 pt-4 flex items-center justify-between pb-2">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="p-2 -ml-2 text-white hover:bg-gray-50 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </button>
            <span className="ml-2 font-bold text-white">Carrinho</span>
          </div>
          
        </div>
        <CheckoutStepper currentStep={1} />
      </div>

      {/* Título e Ações da Lista */}
      <div className="px-4 mt-6 flex justify-between items-center">
        <h1 className="font-bold text-gray-900 text-lg">Itens de compra</h1>
        {items.length > 0 && (
          <button 
            onClick={handleClearCart}
            className="text-xs text-red-500 font-medium flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded transition-colors"
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
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <ShoppingCart size={48} className="mb-4 opacity-50" />
            <p>Seu carrinho está vazio.</p>
          </div>
        )}
      </div>

      {/* Footer com o novo design */}
      <CartFooter 
        total={total}
        minOrderValue={minOrderValue}
        onNext={handleConfirm}
        isLoading={isSaving}
        buttonText="CONFIRMAR ENDEREÇO"
        isButtonDisabled={items.length === 0}
      />
    </div>
  );
}