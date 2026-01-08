import { create } from 'zustand';
import { createSupabaseClient } from '@/lib/supabase/client';
import { Database } from '@/types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type User = { id: string; email?: string };

interface UserState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  
  // Actions
  fetchUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  profile: null,
  isLoading: true, // Começa carregando

  fetchUser: async () => {
    const supabase = createSupabaseClient();
    
    // 1. Pega o usuário da Sessão (Auth)
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      set({ user: null, profile: null, isLoading: false });
      return;
    }

    // 2. Pega os dados extras da tabela Profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    set({ 
      user: { id: user.id, email: user.email }, 
      profile: profile, 
      isLoading: false 
    });
  },

  signOut: async () => {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  }
}));