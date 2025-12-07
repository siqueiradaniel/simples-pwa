'use client';

interface CartSummaryProps {
  total: number;
  minOrderValue: number;
}

export default function CartSummary({ total, minOrderValue }: CartSummaryProps) {
  const remaining = Math.max(0, minOrderValue - total);
  const progress = Math.min(100, (total / minOrderValue) * 100);
  const isReached = total >= minOrderValue;

  const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);
  const formattedRemaining = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(remaining);

  return (
    <div className="bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-4 fixed bottom-0 left-0 right-0 pb-safe z-40">
      
      {/* Barra de Progresso do Pedido Mínimo */}
      {!isReached ? (
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5 font-medium">
            <span className="text-gray-600">Faltam <span className="text-red-500 font-bold">{formattedRemaining}</span> para liberar</span>
            <span className="text-gray-400">Mínimo: R$ {minOrderValue},00</span>
          </div>
          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500 relative"
              style={{ width: `${progress}%` }}
            >
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4 bg-green-50 text-green-700 text-xs font-bold px-3 py-2 rounded-lg flex items-center justify-center gap-2 border border-green-100">
          Pedido mínimo atingido! Compra liberada.
        </div>
      )}

      <div className="flex justify-between items-end mb-4">
        <span className="text-sm font-bold text-gray-900">Total</span>
        <span className="text-xl font-extrabold text-gray-900">{formattedTotal}</span>
      </div>
    </div>
  );
}