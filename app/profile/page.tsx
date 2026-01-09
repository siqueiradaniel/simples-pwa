import { redirect, notFound } from "next/navigation";
import UserDataForm from "@/components/users/UserDataForm";
import { getUserById } from "@/lib/api/user";
import { supabaseServer } from "@/lib/supabase/server";

export default async function ProfileEditPage() {
  const supabase = await supabaseServer();
  
  // 1. Pega o usuário da SESSÃO (Auth)
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login");
  }

  // 2. Pega os dados do PERFIL (Banco de Dados)
  const profile = await getUserById(authUser.id);

  if (!profile) {
    notFound();
  }

  // Passamos o email do AuthUser separadamente, pois não existe na tabela profiles
  return <UserDataForm profile={profile} email={authUser.email || ''} />;
}