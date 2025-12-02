'use client'

import { useEffect, useState } from "react";
import { Home as HomeIcon } from "lucide-react"; // Renomeado para evitar conflito com o componente Home

// Importações dos componentes
import HomeHeader from '@/components/HomeHeader'
import SearchBar from '@/components/SearchBar'
import VerticalScrollingCategory from '@/components/VerticalScrollingCategory'
import BottomNavigationBar from '@/components/BottomNavigationBar'

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    // Detecta se o app está rodando de forma instalada (standalone)
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    setIsStandalone(standalone || true);

    // Captura o evento que permite a instalação
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true); // Mostra o botão de instalar
    };

    window.addEventListener("beforeinstallprompt", handler as any);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler as any);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("Usuário aceitou a instalação");
    } else {
      console.log("Usuário recusou a instalação");
    }

    setDeferredPrompt(null);
    setCanInstall(false);
  };

  return (
    isStandalone ? (
      // Se estiver instalado, mostra a aplicação completa
      <div className="min-h-screen bg-gray-50 pb-24 font-sans relative">
        {/* Estilos globais específicos para esta página */}
        <style jsx global>{`
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
      // Se não estiver instalado, mostra a tela de instalação
      <main className="flex items-center justify-center h-screen bg-gray-50 px-4">
        <div className="p-8 bg-white rounded-2xl shadow-lg text-center w-full max-w-sm">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-blue-600">
            <HomeIcon size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-3 text-gray-800">Instale nosso App</h1>
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
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
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-600">
                Instalação indisponível neste navegador
              </p>
              <p className="text-xs text-gray-400 bg-gray-50 p-3 rounded-lg">
                Se estiver no iOS, toque em Compartilhar e "Adicionar à Tela de Início".
              </p>
            </div>
          )}
        </div>
      </main>
    )
  );
}