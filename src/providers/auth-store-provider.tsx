'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';

export function AuthStoreProvider({ children }: { children: React.ReactNode }) {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    // Initialize auth state on mount
    fetchUser();

    // Listen for auth changes (login/logout events)
    const handleAuthChange = () => {
      fetchUser();
    };

    window.addEventListener('auth-change', handleAuthChange);

    // Cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth-change') {
        fetchUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [fetchUser]);

  return <>{children}</>;
}
