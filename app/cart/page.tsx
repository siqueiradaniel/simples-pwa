import CartPageClient from "@/components/CartPageClient";
import { getOrCreateCartId } from "@/lib/api/cart";

// Opcional: Impedir cache para garantir que sempre pegue o status atual ao entrar
export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const userId = 1; // Fixo conforme pedido
  const branchId = 1; // Fixo ou viria de contexto/cookie da filial selecionada
  const MINIMUM_ORDER_VALUE = 80; // Fixo R$ 80,00 virá do supermarket

  // Garantimos que o pedido existe no banco
  const orderId = await getOrCreateCartId(userId, branchId);

  // Não precisamos buscar os itens aqui, pois o Zustand já os tem (ou vai buscar).
  // Isso evita ter que passar "initialItems" e sincronizar dois estados.

  return (
    <CartPageClient 
      orderId={orderId} 
      minOrderValue={MINIMUM_ORDER_VALUE} 
    />
  );
}