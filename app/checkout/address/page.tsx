import { redirect } from "next/navigation";
import CartAddressPageClient from "@/components/checkout/address/CartAddressPageClient";
import { supabaseServer } from "@/lib/supabase/server";

export default async function CheckoutAddressPage() {
  const supabase = await supabaseServer();

  // 1. Pega o usuário da sessão no servidor
  const { data: { user } } = await supabase.auth.getUser();

  // Se o middleware falhar por algum motivo, barramos aqui
  if (!user) {
    redirect('/login?next=/checkout/address');
  }

  // 2. Passamos o usuário inicial para o componente cliente
  // Isso evita que o cliente tenha que esperar o Zustand carregar
  return <CartAddressPageClient initialUser={user} />;
}