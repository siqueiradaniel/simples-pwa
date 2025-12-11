import UsersPageClient from "@/components/users/UsersPageClient";
import { getSupermarketUsers } from "@/lib/api/users";

export default async function UsersPage() {
  const chainId = 1; // ID da rede (fixo por enquanto, deve vir da sessão do gerente)
  
  // Busca segura no servidor
  const users = await getSupermarketUsers(chainId);

  return <UsersPageClient users={users} />;
}