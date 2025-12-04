import { getPost, getPosts } from '@/lib/firestore/posts';
import { getCommentsByPostId } from '@/lib/firestore/comments';
import { PostDetail } from '../components';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map(post => ({
    id: post.id,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const [post, comments] = await Promise.all([getPost(id), getCommentsByPostId(id)]);

  if (!post) {
    return notFound();
  }

  return <PostDetail post={post} comments={comments} />;
}
