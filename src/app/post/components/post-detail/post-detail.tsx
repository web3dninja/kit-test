'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CommentSection } from '@/components/blog/comment-section';
import { PostFooter } from './post-footer';
import { PostContent } from './post-content';
import { DeletePostDialog } from './delete-post-dialog';
import { useDeletePostMutation } from '../../hooks/useDeletePostMutation';
import { PostActions } from './post-actions';
import type { Post } from '@/types/post';
import { useAuthStore } from '@/store/auth-store';
import type { Comment } from '@/types/comment';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';

interface PostDetailProps {
  post: Post;
  comments: Comment[];
}

export function PostDetail({ post, comments }: PostDetailProps) {
  const currentUser = useAuthStore(state => state.user);
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);
  const deleteMutation = useDeletePostMutation(post.id);

  const handleDelete = () => {
    setOpenAlert(true);
  };

  const confirmDelete = () => {
    setOpenAlert(false);
    deleteMutation.mutate();
  };

  const handleEdit = () => {
    router.push(`/post/${post.id}/edit`);
  };

  const isAuthor = currentUser?.id === post.authorId;

  return (
    <div className="content container mx-auto">
      <div className="content-header">
        <h1>
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            {' '}
            <ArrowLeft className="size-4" /> Back{' '}
          </Button>
          {post.title} <div className="flex-1" />
          <PostActions showActions={isAuthor} onEdit={handleEdit} onDelete={handleDelete} />
        </h1>
      </div>
      <Card>
        <CardHeader>
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <User className="size-4" />
            <span>{post.author?.username}</span>
          </div>
        </CardHeader>
        <CardContent>
          <PostContent content={post.content} />
        </CardContent>

        <CardFooter className="justify-end">
          <PostFooter post={post} />
        </CardFooter>
      </Card>

      <CommentSection postId={post.id} comments={comments} />

      <DeletePostDialog
        open={openAlert}
        onOpenChange={setOpenAlert}
        postTitle={post.title}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
