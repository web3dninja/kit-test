'use client';

import type { Comment } from '@/types/comment';
import { Separator } from '@/components/ui/separator';
import { User, Calendar } from 'lucide-react';
import { formatDateTime } from '@/utils/date';

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">No comments yet. Be the first!</div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment, index) => {
        const formattedDate = formatDateTime(comment.createdAt);
        const authorName = comment.author?.username || 'Unknown';

        return (
          <div key={comment.id}>
            {index > 0 && <Separator className="my-4" />}
            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center gap-1 text-sm">
                <User className="size-4" />
                <span className="font-medium">{authorName}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
              <div className="text-muted-foreground flex items-center justify-end gap-1 text-sm">
                <Calendar className="size-4" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
