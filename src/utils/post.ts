import type { Post } from '@/types/post';
import type { User } from '@/types/user';
import { findUserById } from '@/lib/firestore/users';
import { timestampToDate } from './timestamp';

export async function firestoreToPost(id: string, data: any): Promise<Post> {
  const authorId = data.authorId;
  let author: User | undefined;

  if (authorId) {
    const authorData = await findUserById(authorId);
    if (authorData) {
      author = {
        id: authorData.id,
        username: authorData.username,
        email: authorData.email,
        role: authorData.role,
      };
    }
  }

  return {
    id,
    title: data.title || '',
    content: data.content || '',
    authorId: authorId || 0,
    author,
    createdAt: timestampToDate(data.createdAt).toISOString(),
    updatedAt: timestampToDate(data.updatedAt).toISOString(),
  };
}
