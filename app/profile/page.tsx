import UserDataForm from "@/components/users/UserDataForm";
import { getUserById } from "@/lib/api/user";
import { notFound } from "next/navigation";

export default async function ProfileEditPage() {
  const userId = 1; // Fixo por enquanto, futuramente pegar da sessão do Supabase (auth.uid())
  
  const user = await getUserById(userId);

  if (!user) {
    notFound();
  }

  return <UserDataForm user={user} />;
}