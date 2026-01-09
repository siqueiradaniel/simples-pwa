'use client';

import { useEffect } from "react";
import { useUserStore } from "@/lib/store/userStore";
import ProfileActionsList from "@/components/account/ProfileActionsList";
import ProfileImageContent from "@/components/account/ProfileImageContent";

// Recebe os dados prontos do servidor
interface AccountPageClientProps {
  initialUser: any;
  initialProfile: any;
}

export default function AccountPageClient({ initialUser, initialProfile }: AccountPageClientProps) {
  const { user, profile, setUserState } = useUserStore();

  // "Hidrata" o store imediatamente com os dados do servidor
  useEffect(() => {
    if (initialUser && !user) {
      setUserState({
        user: { id: initialUser.id, email: initialUser.email },
        profile: initialProfile,
        isLoading: false
      });
    }
  }, [initialUser, initialProfile, user, setUserState]);

  // Usa os dados do store OU os iniciais (Fallback seguro)
  const currentUser = user || { id: initialUser.id, email: initialUser.email };
  const currentProfile = profile || initialProfile;
  const clientName = currentProfile?.full_name || currentUser.email?.split('@')[0] || "Visitante";

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      <ProfileImageContent name={clientName} />
      <ProfileActionsList userId={currentUser.id} />
    </div>
  );
}