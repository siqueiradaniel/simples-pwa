import { redirect } from "next/navigation";
import AddressFormClient from "@/components/address/AddressFormClient";
import { supabaseServer } from "@/lib/supabase/server";

export default async function NewAddressPage() {
  const supabase = await supabaseServer();

  // 1. Garante autenticação no servidor (Zero Latência)
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/addresses/new");
  }

  // 2. Passa o usuário inicial via prop
  return <AddressFormClient initialUser={user} />;
}