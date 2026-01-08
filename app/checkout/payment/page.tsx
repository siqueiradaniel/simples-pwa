
import CartPaymentPageClient from "@/components/checkout/payment/CartPaymentPageClient";
import { getOrCreateCartId, getCurrentOrder, getCartItems } from "@/lib/api/cart";

export default async function CheckoutPaymentPage() {
  const userId = 'ca463a4e-ec85-4052-991f-dd3af9406693';; // Fixo
  const branchId = 1; // Fixo

  // Busca dados do pedido atual
  const orderId = await getOrCreateCartId(userId, branchId);
  const orderData = await getCurrentOrder(orderId);
  const items = await getCartItems(orderId);

  // Calcula total
  const totalPrice = orderData?.total_price || 0;

  return (
    <CartPaymentPageClient 
      orderId={orderId} 
      totalPrice={totalPrice}
      items={items}
    />
  );
}