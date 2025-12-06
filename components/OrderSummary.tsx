'use client';

interface OrderSummaryProps {
  total: number;
  deliveryFee: number;
  discount: number;
}

export default function OrderSummary({ total, deliveryFee, discount }: OrderSummaryProps) {
  const formatMoney = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  const subtotal = total - deliveryFee + discount;

  return (
    <div className="bg-white p-4 mb-2 border-y border-gray-100 space-y-2">
      <h3 className="text-xs font-bold text-gray-900 uppercase mb-3 tracking-wide">Resumo Financeiro</h3>
      
      <div className="flex justify-between text-xs text-gray-600">
        <span>Subtotal</span>
        <span>{formatMoney(subtotal)}</span>
      </div>
      
      <div className="flex justify-between text-xs text-gray-600">
        <span>Taxa de entrega</span>
        <span>{deliveryFee > 0 ? formatMoney(deliveryFee) : 'Grátis'}</span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between text-xs text-green-600">
          <span>Desconto</span>
          <span>- {formatMoney(discount)}</span>
        </div>
      )}

      <div className="border-t border-gray-100 my-2 pt-2 flex justify-between items-center">
        <span className="text-sm font-bold text-gray-900">Total</span>
        <span className="text-lg font-bold text-gray-900">{formatMoney(total)}</span>
      </div>
    </div>
  );
}