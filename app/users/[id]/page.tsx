import UserDataDisplay from "@/components/UserDataDisplay";
import { getUserById } from "@/lib/api/user";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserViewPage({ params }: PageProps) {
  const { id } = await params;
  
  // Busca segura no servidor. 
  // Em um app real, aqui verificaríamos se o usuário logado tem permissão de 'MANAGER' ou 'ADMIN' antes de buscar.
  const user = await getUserById(Number(id));

  if (!user) {
    notFound();
  }

  return <UserDataDisplay user={user} />;
}