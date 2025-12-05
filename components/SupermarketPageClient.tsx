'use client';

import ChainHeader from "./ChainHeader";
import BranchCard from "./BranchCard";
import { SupermarketWithBranch } from "@/types";

export default function SupermarketPageClient({ data }: { data: SupermarketWithBranch[] }) {
  const chainInfo = data[0];

  if (!chainInfo) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <ChainHeader 
        name={chainInfo.chain_name}
        logoUrl={chainInfo.chain_logo}
        cnpj={chainInfo.chain_cnpj}
        branchCount={data.length}
      />

      <div className="px-4 py-6 max-w-2xl mx-auto pb-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Suas Filiais
          </h2>
          <button className="text-xs text-blue-600 font-medium hover:underline">
            + Nova Filial
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          {data.map((branch) => (
            <BranchCard key={branch.branch_id} data={branch} />
          ))}
        </div>
      </div>
    </div>
  );
}