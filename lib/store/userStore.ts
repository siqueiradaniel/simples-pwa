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
  // Adicione esta linha:
  setUserState: (data: { user: User | null, profile: Profile | null, isLoading: boolean }) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  profile: null,
  isLoading: true,

  // Ação simples para o AppInitializer usar
  setUserState: (data) => set(data),

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const supabase = createSupabaseClient();
      
      // ALTERAÇÃO IMPORTANTE:
      // Usamos getSession() primeiro. Ele verifica a cache local do navegador
      // de forma mais eficiente para recuperar o token persistido.
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.user) {
        // Se falhar a sessão local, tentamos uma última verificação no servidor
        const { data: { user: serverUser } } = await supabase.auth.getUser();
        
        if (!serverUser) {
           console.log("Nenhum usuário encontrado no cliente.");
           set({ user: null, profile: null, isLoading: false });
           return;
        }
        
        // Se encontrou via getUser, usamos esse
        // ... Lógica de buscar perfil (igual abaixo) ...
      }

      const user = session?.user;

      if (!user) {
         set({ user: null, profile: null, isLoading: false });
         return;
      }

      // 2. Busca perfil no banco
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

    } catch (error) {
      console.error("Erro no fetchUser:", error);
      set({ user: null, profile: null, isLoading: false });
    }
  },

  signOut: async () => {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    set({ user: null, profile: null });
    window.location.href = '/login';
  }
}));