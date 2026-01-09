'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";
import ProfileActionsList from "@/components/account/ProfileActionsList";
import ProfileImageContent from "@/components/account/ProfileImageContent";
import { Loader2 } from "lucide-react";

export default function AccountPageClient() {
  const { user, profile, isLoading } = useUserStore();
  const router = useRouter();

  // Proteção de rota no cliente (caso o middleware falhe ou para UX instantânea)
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?next=/account');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  // Se não tiver usuário, retorna null enquanto redireciona
  if (!user) return null;

  // Lógica de nome: Tenta o perfil, senão o email, senão "Visitante"
  const clientName = profile?.full_name || user.email?.split('@')[0] || "Visitante";

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      {/* Header com a foto/iniciais e nome */}
      <ProfileImageContent name={clientName} />
      
      {/* Lista de ações passando o ID do usuário logado */}
      <ProfileActionsList userId={user.id} />
    </div>
  );
}