'use client';

import { CreatePostForm } from '../components';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { AuthRequired } from '@/components/auth/auth-required';

export default function CreatePostPage() {
  const currentUser = useAuthStore(state => state.user);
  const router = useRouter();

  if (!currentUser) {
    return (
      <AuthRequired
        message="You must be logged in to create a post."
        className="mx-auto max-w-2xl"
      />
    );
  }

  return (
    <div className="content container mx-auto">
      <div className="content-header">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>
      <div className="mx-auto w-full max-w-2xl">
        <CreatePostForm currentUser={currentUser} />
      </div>
    </div>
  );
}
