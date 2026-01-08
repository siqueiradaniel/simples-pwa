import UserDataForm from "@/components/users/UserDataForm";
import { getUserById } from "@/lib/api/user";
import { notFound } from "next/navigation";

export default async function ProfileEditPage() {
  const userId = 'ca463a4e-ec85-4052-991f-dd3af9406693'; // Fixo por enquanto, futuramente pegar da sessão do Supabase (auth.uid())
  
  const user = await getUserById(userId);

  if (!user) {
    notFound();
  }

  return <UserDataForm user={user} />;
}