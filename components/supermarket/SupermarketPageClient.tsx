'use client';

import ChainHeader from "./ChainHeader";
import BranchManagementCard from "./BranchManagementCard";
import { SupermarketWithBranch } from "@/types";
import { Package, Users, BarChart3, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SupermarketPageClient({ data }: { data: SupermarketWithBranch[] }) {
  const chainInfo = data[0];

  if (!chainInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-sm">
        Nenhuma informação encontrada.
      </div>
    );
  }

  // Mantivemos o menu administrativo global, pois ele é útil para coisas que não são de uma filial específica (ex: relatórios globais)
  const managementMenu = [
    { 
      label: "Relatórios Globais", 
      icon: BarChart3, 
      href: "/reports",
      disabled: false 
    },
    { 
      label: "Gestão de Usuários", 
      icon: Users, 
      href: "/users", 
      disabled: false 
    },
    { 
      label: "Catálogo Geral de Produtos", 
      icon: Package, 
      href: "/supermarket-products", 
      disabled: false
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <ChainHeader 
        name={chainInfo.chain_name}
        logoUrl={chainInfo.chain_logo}
        cnpj={chainInfo.chain_cnpj}
        branchCount={data.length}
      />

      {/* Menu de Gestão Administrativa Global */}
      <div className="bg-white border-b border-gray-100 mb-6">
        {managementMenu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.disabled ? '#' : item.href}
              className={`flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-none transition-colors ${
                item.disabled ? 'opacity-50 cursor-not-allowed' : 'active:bg-gray-50 hover:bg-gray-50'
              }`}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <div className="flex items-center gap-4">
                <Icon size={20} className="text-gray-600" strokeWidth={1.5} />
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
          );
        })}
      </div>

      <div className="px-4 pb-24 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Filiais & Operações
          </h2>
          <button className="text-xs text-blue-600 font-medium hover:bg-blue-50 px-3 py-1 rounded-full transition-colors">
            + Nova Filial
          </button>
        </div>
        
        {/* Lista de Filiais com Ações Diretas */}
        <div className="flex flex-col gap-4">
          {data.map((branch) => (
            <BranchManagementCard key={branch.branch_id} data={branch} />
          ))}
        </div>
      </div>
    </div>
  );
}