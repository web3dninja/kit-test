'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User } from '@/types/user';
import { getCurrentUserAction } from '@/actions/user';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,

      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const user = await getCurrentUserAction();
          set({
            user,
            isAuthenticated: !!user,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to fetch user:', error);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
    }),
    { name: 'auth-store' }
  )
);
