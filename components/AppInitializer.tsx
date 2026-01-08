'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '@/lib/store/cartStore';
import { useUserStore } from '@/lib/store/userStore';

export default function AppInitializer() {
  const initializeCart = useCartStore(state => state.initializeCart);
  const { fetchUser, user } = useUserStore();
  const initialized = useRef(false);

  // 1. Primeiro carrega o usuário
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // 2. Assim que tiver usuário, carrega o carrinho dele
  useEffect(() => {
    if (user && !initialized.current) {
      const branchId = 1; // Fixo por enquanto
      initializeCart(user.id, branchId);
      initialized.current = true;
    }
  }, [user, initializeCart]);

  return null;
}