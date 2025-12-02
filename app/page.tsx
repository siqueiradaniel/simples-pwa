'use client'

import HomeHeader from "@/components/HomeHeader";
import SearchBar from "@/components/SearchBar";
import VerticalScrollingCategory from "@/components/VerticalScrollingCategory"
import BottomNavigationBar from "@/components/BottomNavigationBar"
import { HomeIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    // Detecta se o app está rodando de forma instalada (standalone)
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    // NOTA PARA VISUALIZAÇÃO: Remova o '|| true' em produção
    // Mantive true aqui apenas para o preview do artefato funcionar
    setIsStandalone(standalone || true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Usuário ${outcome === "accepted" ? "aceitou" : "recusou"} a instalação`);
    setDeferredPrompt(null);
    setCanInstall(false);
  };

  return (
    // Usa isStandalone (ou 1 como no seu snippet original para forçar true no dev)
    isStandalone ? (
      <div className="min-h-screen bg-gray-50 pb-24 font-sans relative">
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          .pb-safe { padding-bottom: env(safe-area-inset-bottom, 16px); }
        `}</style>

        <HomeHeader />
        <SearchBar />
        
        <div className="flex flex-col gap-2">
          <VerticalScrollingCategory title="Mercearia" />
          <VerticalScrollingCategory title="Padaria" />
          <VerticalScrollingCategory title="Frios" />
        </div>

        <BottomNavigationBar />
      </div>
    ) : (
      <main className="flex items-center justify-center h-screen bg-gray-50 px-4">
        <div className="p-8 bg-white rounded-2xl shadow-lg text-center w-full max-w-sm">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-blue-600">
            <HomeIcon size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-3 text-gray-800">Instale nosso App</h1>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Para a melhor experiência e acesso rápido às suas compras, adicione nosso aplicativo à sua tela inicial.
          </p>
          {canInstall ? (
            <button
              onClick={handleInstall}
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-blue-200 shadow-lg"
            >
              Instalar App
            </button>
          ) : (
            <p className="text-xs text-gray-400 bg-gray-50 p-3 rounded-lg">
              Para instalar: Toque em compartilhamento e depois em "Adicionar à Tela de Início"
            </p>
          )}
        </div>
      </main>
    )
  );
}