'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CommentForm } from './comment-form';
import { CommentList } from './comment-list';
import { Skeleton } from '@/components/ui/skeleton';
import type { Comment } from '@/types/comment';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
}

export function CommentSection({ postId, comments }: CommentSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CommentForm postId={postId} />
        <CommentList comments={comments} />
      </CardContent>
    </Card>
  );
}
