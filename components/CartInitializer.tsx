'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '@/lib/store/cartStore';

export default function CartInitializer() {
  const initializeCart = useCartStore(state => state.initializeCart);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      // Hardcoded por enquanto, depois pode vir de props passadas pelo Server Component do layout
      const userId = 1;
      const branchId = 1;
      
      initializeCart(userId, branchId);
      initialized.current = true;
    }
  }, [initializeCart]);

  return null; // Este componente não renderiza nada visualmente
}