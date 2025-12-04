import type { Comment } from '@/types/comment';
import { findUserById } from '@/lib/firestore/users';
import { timestampToDate } from './timestamp';

export async function firestoreToComment(id: string, data: any): Promise<Comment> {
  const authorId = data.authorId;
  let author;

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
    postId: data.postId || '',
    authorId: authorId || 0,
    author,
    content: data.content || '',
    createdAt: timestampToDate(data.createdAt).toISOString(),
  };
}
