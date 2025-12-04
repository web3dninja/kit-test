'use client';

import { Calendar, User } from 'lucide-react';
import type { Post } from '@/types/post';
import { formatDateTime } from '@/utils/date';

interface PostFooterProps {
  post: Post;
}

export function PostFooter({ post }: PostFooterProps) {
  const formattedDate = formatDateTime(post.createdAt);
  const authorName = post.author?.username || 'Unknown';

  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
      <div className="flex-1">
        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="size-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
