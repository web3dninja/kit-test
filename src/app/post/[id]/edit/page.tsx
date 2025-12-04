import { getPost } from '@/lib/firestore/posts';
import { UpdatePostForm } from '../../components';
import { AuthRequired } from '@/components/auth/auth-required';
import { AccessDenied } from '@/components/auth/access-denied';
import { getCurrentUser } from '@/utils/session';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const [currentPost, user] = await Promise.all([getPost(id), getCurrentUser()]);

  if (!currentPost) {
    return notFound();
  }

  if (!user) {
    return (
      <AuthRequired message="You must be logged in to edit a post." className="mx-auto max-w-2xl" />
    );
  }

  if (currentPost.authorId !== user.id) {
    return (
      <AccessDenied
        message="You can only edit your own posts."
        backUrl={`/post/${id}`}
        backLabel="Back to Post"
        className="mx-auto max-w-2xl"
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <UpdatePostForm initialData={currentPost} currentUser={user} />
    </div>
  );
}
