'use client';

import CheckoutStepper from "@/components/CheckoutStepper";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
// import confetti from "canvas-confetti";

export default function OrderSuccessPageClient({ orderId }: { orderId: number }) {
  
//   // Efeito de confete ao carregar a tela para celebrar a compra
//   useEffect(() => {
//     const duration = 3 * 1000;
//     const animationEnd = Date.now() + duration;
//     const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

//     const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

//     const interval: any = setInterval(function() {
//       const timeLeft = animationEnd - Date.now();

//       if (timeLeft <= 0) {
//         return clearInterval(interval);
//       }

//       const particleCount = 50 * (timeLeft / duration);
//       confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
//       confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
//     }, 250);

//     return () => clearInterval(interval);
//   }, []);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Header com Stepper Completo */}
      <div className="bg-cyan-500 pt-8 pb-4">
        <CheckoutStepper currentStep={4} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center -mt-20">
        
        <div className="bg-white p-4 rounded-full shadow-xl mb-6 animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <CheckCircle2 size={48} strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
          Compra realizada com sucesso!
        </h1>
        <p className="text-gray-500 text-sm mb-8 max-w-xs leading-relaxed">
          Seu pedido <span className="font-mono font-bold text-gray-700">#{orderId}</span> foi recebido e já estamos preparando tudo.
        </p>

        <div className="w-full space-y-3">
          <Link 
            href={`/orders/${orderId}`}
            className="w-full bg-blue-900 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-blue-800"
          >
            Acompanhar pedido
            <ArrowRight size={18} />
          </Link>

          <Link 
            href="/"
            className="w-full bg-gray-50 text-gray-600 font-bold text-sm py-4 rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Voltar para a loja
          </Link>
        </div>

      </div>
    </div>
  );
}