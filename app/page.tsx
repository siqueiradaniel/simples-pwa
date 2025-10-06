"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    // Detecta se está rodando como app instalado
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    setIsStandalone(standalone);

    // Captura o evento de instalação
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true); // só mostra o botão se o evento foi disparado
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("Usuário aceitou instalar");
    } else {
      console.log("Usuário recusou instalar");
    }

    setDeferredPrompt(null);
    setCanInstall(false); // esconde o botão depois da escolha
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-2xl shadow-md text-center w-96">
        {isStandalone ? (
          <h1 className="text-2xl font-bold">La bombonera!</h1>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">Instale nosso App</h1>
            {canInstall && (
              <button
                onClick={handleInstall}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Instalar App
              </button>
            )}
          </>
        )}
      </div>
    </main>
  );
}
