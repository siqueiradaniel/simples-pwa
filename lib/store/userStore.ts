import { create } from 'zustand';
import { createSupabaseClient } from '@/lib/supabase/client';
import { Database } from '@/types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type User = { id: string; email?: string };

interface UserState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  
  fetchUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  profile: null,
  isLoading: true,

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const supabase = createSupabaseClient();
      
      // 1. Pega usuário da sessão
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        set({ user: null, profile: null, isLoading: false });
        return;
      }

      // 2. Busca perfil no banco
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Erro ao buscar perfil:", error);
        // Mesmo com erro de perfil, mantemos o user auth logado, mas sem perfil
      }

      set({ 
        user: { id: user.id, email: user.email }, 
        profile: profile, 
        isLoading: false 
      });

    } catch (error) {
      console.error("Erro fatal no fetchUser:", error);
      set({ user: null, profile: null, isLoading: false });
    }
  },

  signOut: async () => {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    set({ user: null, profile: null });
    window.location.href = '/login'; // Força refresh total
  }
}));