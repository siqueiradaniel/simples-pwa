import AddressFormClient from "@/components/AddressFormClient";
import { getAddressById } from "@/lib/api/address";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAddressPage({ params }: PageProps) {
  const { id } = await params;
  const userId = 1; // Fixo por enquanto

  // Busca os dados no servidor antes de renderizar
  const address = await getAddressById(Number(id));

  // Se o ID não existir, mostra página 404 padrão do Next
  if (!address) {
    notFound();
  }

  return <AddressFormClient initialData={address} userId={userId} />;
}