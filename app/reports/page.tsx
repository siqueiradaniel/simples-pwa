import ReportPageClient from "@/components/supermarket/ReportPageClient";
import { getDashboardData } from "@/lib/api/report";

// Revalida a cada 5 minutos para não sobrecarregar o banco com cálculos pesados,
// mas manter o dashboard relativamente atualizado.
export const revalidate = 300; 

export default async function ReportsPage() {
  const branchId = 1; // Fixo por enquanto
  const data = await getDashboardData(branchId);

  return <ReportPageClient data={data} />;
}