'use client';

import ProfileActionsList from "@/components/ProfileActionsList";
import ProfileImageContent from "@/components/ProfileImageContent";
import ProfileOrders from "@/components/ProfileOrders";
import { OrderWithUser } from "@/types";

interface AccountPageClientProps {
  orders: OrderWithUser[];
  userId: number;
}

export default function AccountPageClient({ orders, userId }: AccountPageClientProps) {
  // Tenta pegar o nome do primeiro pedido ou usa um padrão
  const clientName = orders[0]?.fullName ?? "Visitante";

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      <ProfileImageContent name={clientName} />
      {/* Passamos o userId para a lista de ações, caso ela precise usar em links (ex: /users/[id]) */}
      <ProfileActionsList userId={userId} />
      <ProfileOrders orders={orders} />
    </div>
  );
}