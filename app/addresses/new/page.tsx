import AddressFormClient from "@/components/address/AddressFormClient";

export default function NewAddressPage() {
  // O componente cliente pega o usuário autenticado do Store automaticamente.
  return <AddressFormClient />;
}