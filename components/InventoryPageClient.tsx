'use client';

import { useState } from "react";
import InventoryHeader from "./InventoryHeader";
import InventorySummaryCard from "./InventorySummaryCard";
import { InventorySummary } from "@/types";

export default function InventoryPageClient({ inventory }: { inventory: InventorySummary[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = inventory.filter(item => 
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockCount = inventory.filter(i => i.total_stock <= i.min_stock_limit).length;

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-24">
      <InventoryHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        lowStockCount={lowStockCount} 
      />

      <div className="px-4 mt-4 flex flex-col gap-3">
        {filteredItems.map((item) => (
          <InventorySummaryCard key={item.config_id} item={item} />
        ))}

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center">
            <p className="text-sm">Nenhum produto encontrado.</p>
            <p className="text-xs mt-1 opacity-70">Cadastre lotes para ver aqui.</p>
          </div>
        )}
      </div>
    </div>
  );
}