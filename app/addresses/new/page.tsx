import AddressFormClient from "@/components/address/AddressFormClient";

export default function NewAddressPage() {
  const userId = 1; // Fixo por enquanto, futuramente pegar via session (Server Side)

  return <AddressFormClient userId={userId} />;
}