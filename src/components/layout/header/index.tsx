'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { ThemeSwitcher } from './components/theme-switcher';
import { Skeleton } from '../../ui/skeleton';
import { AuthModalButton } from '../../auth/form';
import { UserMenu } from './components/user-menu';
import { useAuthStore } from '@/store/auth-store';
export function Header() {
  const user = useAuthStore(state => state.user);
  const isLoading = useAuthStore(state => state.isLoading);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <BookOpen className="size-6" />
          </Link>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          {isLoading ? (
            <Skeleton className="size-8 rounded-full" />
          ) : user && isAuthenticated ? (
            <UserMenu user={user} />
          ) : (
            <AuthModalButton />
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
