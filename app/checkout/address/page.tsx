
import { getOrCreateCartId, getCurrentOrder } from "@/lib/api/cart";
import { getUserAddresses } from "@/lib/api/address";
import CartAddressPageClient from "@/components/checkout/address/CartAddressPageClient";

export default async function CheckoutAddressPage() {
  const userId = 'ca463a4e-ec85-4052-991f-dd3af9406693';; // Fixo por enquanto
  const branchId = 1; // Fixo

  // 1. Busca o pedido atual (Carrinho)
  const orderId = await getOrCreateCartId(userId, branchId);
  const orderData = await getCurrentOrder(orderId);

  // 2. Busca os endereços do usuário
  const addresses = await getUserAddresses(userId);
  
  // Calcula o total (subtotal + frete - desconto)
  // Assumindo que total_price do pedido já é o final, ou somamos aqui
  // Como syncCart atualiza total_price, usamos ele.
  const totalPrice = orderData?.total_price || 0;

  return (
    <CartAddressPageClient 
      addresses={addresses} 
      orderId={orderId} 
      totalPrice={totalPrice}
    />
  );
}