'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '@/lib/store/cartStore';
import { useUserStore } from '@/lib/store/userStore';
import { createSupabaseClient } from '@/lib/supabase/client';

export default function AppInitializer() {
  const initializeCart = useCartStore(state => state.initializeCart);
  // Importante: Pegamos o setState direto para evitar dependências cíclicas
  const setUser = useUserStore(state => state.setUserState); 
  
  const initialized = useRef(false);

  useEffect(() => {
    const supabase = createSupabaseClient();

    // 1. OUVINTE DE ESTADO (AUTH LISTENER)
    // Isso garante que assim que o cookie for lido, o estado atualiza
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      
      if (session?.user) {
        // Se temos sessão, buscamos o perfil
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        // Atualiza o Zustand
        setUser({ 
          user: { id: session.user.id, email: session.user.email }, 
          profile: profile, 
          isLoading: false 
        });

        // Inicializa o carrinho se ainda não foi feito
        if (!initialized.current) {
          const branchId = 1; 
          initializeCart(session.user.id, branchId);
          initialized.current = true;
        }

      } else {
        // Se não tem sessão (logout ou cookie expirado)
        setUser({ user: null, profile: null, isLoading: false });
        initialized.current = false; // Permite reinicializar se logar depois
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, initializeCart]);

  return null;
}