import { redirect } from "next/navigation";
import AccountPageClient from "@/components/account/AccountPageClient";
import { supabaseServer } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await supabaseServer();
  
  // O servidor JÁ SABE quem é o usuário (graças ao middleware/cookie)
  const { data: { user } } = await supabase.auth.getUser();

  // Se por milagre passar pelo middleware sem user, barra aqui
  if (!user) {
    redirect('/login?next=/account');
  }

  // Busca o perfil no servidor para entregar pronto ao cliente
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Passa os dados iniciais como props
  return <AccountPageClient initialUser={user} initialProfile={profile} />;
}