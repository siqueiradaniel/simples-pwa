import AddressDetailClient from "@/components/address/AddressDetailClient";
import { getAddressById } from "@/lib/api/address";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AddressDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Reutiliza a função que já usa o RPC internamente (seguro e sem duplicar código)
  const address = await getAddressById(id);

  // Se não encontrar o endereço, retorna 404 automaticamente
  if (!address) {
    notFound();
  }

  return <AddressDetailClient address={address} />;
}