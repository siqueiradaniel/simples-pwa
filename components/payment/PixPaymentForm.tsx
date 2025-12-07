'use client';

import { Copy, QrCode } from "lucide-react";

export default function PixPaymentForm() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-4 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col items-center justify-center text-center">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Escaneie o QR Code para pagar</h3>
        
        {/* Placeholder do QR Code */}
        <div className="w-48 h-48 bg-white border-2 border-dashed border-blue-200 rounded-xl flex flex-col items-center justify-center mb-6 relative group cursor-pointer hover:border-blue-400 transition-colors">
          <QrCode size={48} className="text-blue-200 group-hover:text-blue-400 transition-colors" />
          <p className="text-[10px] text-gray-400 mt-2">QR Code do Pagamento</p>
          
          {/* Overlay simulando QR real */}
          <div className="absolute inset-2 bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-contain bg-no-repeat bg-center opacity-10 group-hover:opacity-20 transition-opacity" />
        </div>

        <div className="w-full">
          <p className="text-xs text-gray-500 mb-2">Ou use o Pix Copia e Cola</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-600 font-mono truncate select-all">
              00020126360014BR.GOV.BCB.PIX0114+55279999999995204000053039865802BR5913ATACADAO...
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg transition-colors shadow-sm active:scale-95">
              <Copy size={16} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[10px] text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Aguardando pagamento...
        </div>
      </div>
    </div>
  );
}