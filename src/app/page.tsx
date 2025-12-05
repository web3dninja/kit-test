import { Suspense } from 'react';
import { PostList } from './post/components';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { getPosts } from '@/lib/firestore/posts';
import { DefaultLoading } from '@/components/ui/default-loading';
import Loading from './loading';

async function PostsContent() {
  const posts = await getPosts();
  return <PostList posts={posts} />;
}

export default async function HomePage() {
  return (
    <div className="content container mx-auto">
      <div className="content-header">
        <h1>
          Blog
          <Link href="/post/create" className="ml-auto">
            <Button variant="outline" size="md">
              <PlusCircle className="mr-2 size-4" />
              Create Post
            </Button>
          </Link>
        </h1>
        <p className="text-muted-foreground mt-2">
          We share our thoughts and ideas about web development
        </p>
      </div>

      <Suspense fallback={<Loading />}>
        <PostsContent />
      </Suspense>
    </div>
  );
}
