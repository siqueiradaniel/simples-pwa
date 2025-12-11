'use client';

import { ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { InventorySummary, ProductBatch } from "@/types";
import ProductInfoSection from "./ProductInfoSection";
import BatchCard from "./BatchCard";

interface ProductDetailsPageClientProps {
  product: InventorySummary;
  batches: ProductBatch[];
}

export default function ProductDetailsPageClient({ product, batches }: ProductDetailsPageClientProps) {
  const router = useRouter();

  // Separa lotes ativos de esgotados/vencidos para organizar a lista
  const activeBatches = batches.filter(b => b.quantity > 0);
  const historyBatches = batches.filter(b => b.quantity === 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Header Transparente Flutuante */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 border-b border-gray-100">
        <button 
          onClick={() => router.back()} 
          className="p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm font-semibold text-gray-900">Detalhes do Produto</span>
        <div className="w-8"></div> {/* Espaçador */}
      </div>

      <ProductInfoSection product={product} />

      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Lotes Ativos ({activeBatches.length})
          </h2>
          <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-100 transition-colors">
            <Plus size={14} /> Novo Lote
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {activeBatches.map(batch => (
            <BatchCard key={batch.id} batch={batch} />
          ))}

          {activeBatches.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-200">
              <p className="text-sm text-gray-500">Nenhum lote ativo no momento.</p>
            </div>
          )}
        </div>

        {/* Histórico (Lotes Esgotados) */}
        {historyBatches.length > 0 && (
          <>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-8 mb-4">
              Histórico de Lotes
            </h2>
            <div className="flex flex-col gap-4 opacity-80 grayscale-[0.5]">
              {historyBatches.map(batch => (
                <BatchCard key={batch.id} batch={batch} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}