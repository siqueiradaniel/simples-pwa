import CartAddressPageClient from "@/components/checkout/address/CartAddressPageClient";

export default function CheckoutAddressPage() {
  // O servidor apenas renderiza o esqueleto.
  // O cliente vai buscar os dados usando o Zustand/API.
  return <CartAddressPageClient />;
}