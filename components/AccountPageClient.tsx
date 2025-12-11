'use client';

import ProfileActionsList from "@/components/ProfileActionsList";
import ProfileImageContent from "@/components/ProfileImageContent";
import { OrderWithUser } from "@/types";

interface AccountPageClientProps {
  orders: OrderWithUser[]; // Mantemos a prop se quiser usar para exibir "Último pedido" ou estatísticas, senão pode remover
  userId: number;
}

export default function AccountPageClient({ orders, userId }: AccountPageClientProps) {
  // Tenta pegar o nome do primeiro pedido ou usa um padrão
  const clientName = orders[0]?.fullName ?? "Visitante";

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      <ProfileImageContent name={clientName} />
      <ProfileActionsList userId={userId} />
    </div>
  );
}