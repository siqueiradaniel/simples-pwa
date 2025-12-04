'use client';

import { useEffect, useState } from "react";
import { Home as HomeIcon } from "lucide-react";

import HomeHeader from '@/components/HomeHeader'
import SearchBar from '@/components/SearchBar'
import VerticalScrollingCategory from '@/components/VerticalScrollingCategory'
import BottomNavigationBar from '@/components/BottomNavigationBar'
import { UIProduct } from "@/types";

export default function HomeClient({ products }: { products: UIProduct[] }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  
  // Agrupa categorias
  const categories = new Map<string, any[]>();
  for (const product of products) {
    const category = product.category_title ?? "Outros";
    if (!categories.has(category)) categories.set(category, []);
    categories.get(category)!.push(product);
  }

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    setIsStandalone(standalone || true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler as any);
    return () => window.removeEventListener("beforeinstallprompt", handler as any);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setCanInstall(false);
  };

  return isStandalone ? (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans relative">
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 16px); }
      `}</style>

      <HomeHeader />
      <SearchBar />

      <div className="flex flex-col gap-2">
        {Array.from(categories.entries()).map(([title, items]) => (
          <VerticalScrollingCategory key={title} title={title} products={items} />
        ))}
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
        <p className="text-gray-600 mb-8 text-sm leading-relaxed">
          Para a melhor experiência, adicione nosso aplicativo à tela inicial.
        </p>

        {canInstall ? (
          <button
            onClick={handleInstall}
            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl"
          >
            Instalar App
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">
              Instalação indisponível neste navegador
            </p>
            <p className="text-xs text-gray-400 bg-gray-50 p-3 rounded-lg">
              No iOS, toque em Compartilhar → “Adicionar à Tela de Início”.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
