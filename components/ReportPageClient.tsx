'use client';

import { ChevronLeft, Wallet, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { DashboardFullData } from "@/types";
import KPICard from "./report/KPICard";
import SalesChart from "./report/SalesChart";
import ProductRanking from "./report/ProductRanking";
import DeadStockList from "./report/DeadStockList";
import NeighborhoodChart from "./report/NeighborhoodChart";

export default function ReportPageClient({ data }: { data: DashboardFullData }) {
  const router = useRouter();
  const { kpis, salesChart, topProducts, deadStock, customersByNeighborhood } = data;

  const fmtMoney = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-24">
      {/* Header Corporativo */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-30 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()} 
            className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-none">Relatório Gerencial</h1>
            <p className="text-xs text-gray-400 mt-0.5">Visão geral da unidade</p>
          </div>
        </div>
        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
          Últimos 30 dias
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Grid de KPIs */}
        <div className="grid grid-cols-2 gap-3">
          <KPICard 
            label="Receita Mensal"
            value={fmtMoney(kpis.revenue)}
            icon={Wallet}
            color="blue"
            trend={12.5}
          />
          <KPICard 
            label="Pedidos"
            value={kpis.orders.toString()}
            icon={ShoppingBag}
            color="purple"
            trend={-2.4}
          />
          <KPICard 
            label="Ticket Médio"
            value={fmtMoney(kpis.avg_ticket)}
            icon={TrendingUp}
            color="green"
          />
          <KPICard 
            label="Clientes Ativos"
            value={kpis.active_customers.toString()}
            icon={Users}
            color="orange"
            subValue="No período"
          />
        </div>

        {/* Gráfico de Vendas */}
        <SalesChart data={salesChart} />

        {/* Distribuição por Bairro (Donut) */}
        {console.log(customersByNeighborhood)}
        <NeighborhoodChart data={customersByNeighborhood} />

        {/* Top 5 Mais Vendidos */}
        <ProductRanking products={topProducts} />

        {/* Alerta de Estoque Parado */}
        <DeadStockList products={deadStock} />

      </div>
    </div>
  );
}