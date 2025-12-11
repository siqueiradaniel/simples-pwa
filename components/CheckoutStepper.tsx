'use client';

import { ShoppingCart, MapPin, CreditCard, Check } from "lucide-react";

export default function CheckoutStepper({ currentStep }: { currentStep: 1 | 2 | 3 | 4 }) {
  const steps = [
    { id: 1, icon: ShoppingCart },
    { id: 2, icon: MapPin },
    { id: 3, icon: CreditCard },
    { id: 4, icon: Check },
  ];

  return (
    <div className="bg-cyan-500 pt-4 pb-8 px-4 rounded-t-none shadow-none mb-6">
      <div className="flex items-center justify-between max-w-xs mx-auto relative">
        {/* Linha de Conexão (Fundo) */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/30 z-0" />

        {/* Linha de Progresso (Ativa) */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-white z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = step.id <= currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-white border-white text-cyan-600 shadow-md scale-110'
                    : 'bg-cyan-600 border-cyan-400 text-cyan-200'
                  }`}
              >
                <Icon size={isCurrent ? 20 : 16} strokeWidth={isCurrent ? 2.5 : 2} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}