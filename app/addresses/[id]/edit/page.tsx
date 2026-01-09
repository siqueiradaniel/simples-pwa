import { notFound } from "next/navigation";
import AddressFormClient from "@/components/address/AddressFormClient";
import { getAddressById } from "@/lib/api/address";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAddressPage({ params }: PageProps) {
  // 1. Resolve os parâmetros da URL (Next.js 15+)
  const { id } = await params;

  // 2. Busca os dados do endereço (ID é string/UUID)
  // Nota: A proteção de rota (Auth) é feita pelo Middleware
  const address = await getAddressById(id);

  // 3. Se não encontrar (ou RLS bloquear), retorna 404
  if (!address) {
    notFound();
  }

  // 4. Renderiza o cliente
  // O Client Component gerencia o estado do usuário via Zustand
  return <AddressFormClient initialData={address} />;
}