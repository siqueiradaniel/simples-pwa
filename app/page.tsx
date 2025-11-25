'use client'

import { useAuth } from '@/contexts/AuthContext'
import AboutUs from "@/components/AboutUs"
import Hero from "@/components/Hero"
import ServiceList from "@/components/ServiceList"
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useAuth();

  // --- Lógica do primeiro código ---
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    // Detecta se o app está rodando de forma instalada (standalone)
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    setIsStandalone(standalone);

    // Captura o evento que permite a instalação
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true); // Mostra o botão de instalar
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Limpa o evento ao desmontar o componente
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  // Função para acionar o prompt de instalação
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
    setCanInstall(false); // Esconde o botão após a interação
  };
  // --- Fim da lógica do primeiro código ---

  // Renderização condicional baseada no status de instalação
  return (
    isStandalone ? (
      // Se estiver instalado, mostra a aplicação completa
      <section className="pb-3">
        <Hero />
        <AboutUs />
        <ServiceList />
      </section>
    ) : (
      // Se não estiver instalado, mostra a tela de instalação
      <main className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-2xl shadow-md text-center w-96">
          <h1 className="text-2xl font-bold mb-6">Instale nosso App</h1>
          <p className="text-gray-600 mb-6">
            Para a melhor experiência, adicione nosso aplicativo à sua tela inicial.
          </p>
          {canInstall ? (
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Instalar App
            </button>
          ) : (
            <p className="text-sm text-gray-500">
              Se o botão não aparecer, seu navegador pode não ser compatível ou o app já foi oferecido.
            </p>
          )}
        </div>
      </main>
    )
  );
}