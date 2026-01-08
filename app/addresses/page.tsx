import AddressListClient from "@/components/address/AddressListClient";
import { getUserAddresses } from "@/lib/api/address";

// Opcional: Adicionar revalidação para garantir dados frescos
// export const revalidate = 0; // Sempre busca novo

export default async function AddressesPage() {
  const userId = 'ca463a4e-ec85-4052-991f-dd3af9406693';; // Fixo por enquanto, futuramente pegar da sessão
  
  // Busca segura no servidor
  const addresses = await getUserAddresses(userId);

  return <AddressListClient addresses={addresses} />;
}