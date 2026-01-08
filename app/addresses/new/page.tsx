import AddressFormClient from "@/components/address/AddressFormClient";

export default function NewAddressPage() {
  const userId = 'ca463a4e-ec85-4052-991f-dd3af9406693';; // Fixo por enquanto, futuramente pegar via session (Server Side)

  return <AddressFormClient userId={userId} />;
}