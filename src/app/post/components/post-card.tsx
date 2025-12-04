'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Post } from '@/types/post';
import { Calendar, User } from 'lucide-react';
import { formatDate } from '@/utils/date';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = formatDate(post.createdAt);
  const authorName = post.author?.username || 'Unknown';

  return (
    <Card className="flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader>
        <div className="text-muted-foreground -mt-4 flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-1">
            <User className="size-4" />
            <span>{authorName}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{formattedDate}</span>
            <Calendar className="size-4" />
          </div>
        </div>
        <CardTitle className="mt-2 line-clamp-1">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/post/${post.id}`} className="w-full">
          <Button className="w-full cursor-pointer">Read more</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
