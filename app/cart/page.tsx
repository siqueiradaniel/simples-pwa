import CartPageClient from "@/components/CartPageClient";
import { getOrCreateCartId, getCartItems } from "@/lib/api/cart";

// Opcional: Impedir cache para garantir que sempre pegue o status atual ao entrar
export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const userId = 1; // Fixo conforme pedido
  const branchId = 1; // Fixo ou viria de contexto/cookie da filial selecionada
  const MINIMUM_ORDER_VALUE = 80; // Fixo R$ 80,00 conforme pedido

  // 1. Garante que existe um carrinho (Order CURRENT)
  const orderId = await getOrCreateCartId(userId, branchId);

  // 2. Busca os itens atuais desse carrinho
  const items = await getCartItems(orderId);

  return (
    <CartPageClient 
      initialItems={items} 
      orderId={orderId} 
      minOrderValue={MINIMUM_ORDER_VALUE} 
    />
  );
}