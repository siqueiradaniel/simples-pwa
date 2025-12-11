'use client';

import { Loader2, CheckCircle2 } from "lucide-react";

interface CartFooterProps {
  total: number;
  minOrderValue?: number;
  onNext: () => void;
  isLoading?: boolean;
  buttonText?: string;
  isButtonDisabled?: boolean;
}

export default function CartFooter({
  total,
  minOrderValue = 0,
  onNext,
  isLoading = false,
  buttonText = "CONFIRMAR ENDEREÇO",
  isButtonDisabled = false
}: CartFooterProps) {
  
  // Lógica de progresso
  const remaining = Math.max(0, minOrderValue - total);
  const progress = minOrderValue > 0 ? Math.min(100, (total / minOrderValue) * 100) : 100;
  const isReached = total >= minOrderValue;
  const showProgressLogic = minOrderValue > 0;

  const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);
  const formattedRemaining = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(remaining);
  const formattedMinOrder = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(minOrderValue);

  // Define se o botão está clicável
  const isDisabled = isButtonDisabled || (showProgressLogic && !isReached) || isLoading;

  return (
    // 'bottom-[60px]' ou 'bottom-16' para ficar acima do BottomNavigation fixo
    <div className="bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-4 fixed bottom-[60px] left-0 right-0 z-40">
      
      {/* Linha de Total */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-xl font-extrabold text-gray-900">{formattedTotal}</span>
      </div>

      {/* Botão com Barra de Progresso Integrada */}
      <div className="relative w-full h-12 rounded-lg overflow-hidden bg-gray-500 shadow-md transition-all">
        {/* Camada de Fundo (Progresso) - Só aparece se tiver validação de mínimo */}
        {showProgressLogic && !isReached && (
          <div 
            className="absolute top-0 left-0 bottom-0 bg-[#00609C] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        )}
        
        {/* Camada de Fundo (Completo) - Cobre tudo quando atingido ou sem validação */}
        {(!showProgressLogic || isReached) && (
          <div className="absolute inset-0 bg-[#00609C]" />
        )}

        {/* Botão Real (Transparente por cima) */}
        <button
          onClick={onNext}
          disabled={isDisabled}
          className="absolute inset-0 w-full h-full flex items-center justify-center z-10 text-white font-bold text-sm uppercase tracking-wide disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" /> Processando...
            </div>
          ) : (
            showProgressLogic && !isReached 
              ? `Faltam ${formattedRemaining}`
              : buttonText
          )}
        </button>
      </div>

      {/* Mensagem Abaixo do Botão */}
      <div className="mt-2 text-center h-5">
        {showProgressLogic ? (
          isReached ? (
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-green-600 animate-in fade-in slide-in-from-top-1">
              <CheckCircle2 size={14} />
              <span>Você já pode finalizar sua compra!</span>
            </div>
          ) : (
            <p className="text-xs font-semibold text-gray-500">
              Compras disponíveis a partir de {formattedMinOrder}
            </p>
          )
        ) : (
           /* Espaço vazio para manter layout consistente se não tiver mensagem */
           <div className="h-4"></div>
        )}
      </div>
    </div>
  );
}