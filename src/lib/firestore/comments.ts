import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';
import type { Comment } from '@/types/comment';
import type { CreateCommentInput } from '@/schemas/comment.schema';
import { firestoreToComment } from '@/utils/comment';
import { firestore } from '@/configs/firebase';

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  const commentsRef = collection(firestore, 'comments');
  const q = query(commentsRef, where('postId', '==', postId));

  const querySnapshot = await getDocs(q);

  const comments: Comment[] = [];

  for (const docSnapshot of querySnapshot.docs) {
    const comment = await firestoreToComment(docSnapshot.id, docSnapshot.data());
    comments.push(comment);
  }

  comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return comments;
}

export async function createComment(data: CreateCommentInput): Promise<Comment> {
  const commentsRef = collection(firestore, 'comments');
  const now = new Date();

  const commentData = {
    ...data,
    createdAt: now,
  };

  const docRef = await addDoc(commentsRef, commentData);
  const docSnap = await getDoc(doc(firestore, 'comments', docRef.id));

  if (!docSnap.exists()) {
    throw new Error('Failed to retrieve created comment');
  }

  return firestoreToComment(docSnap.id, docSnap.data());
}

export async function deleteComment(id: string): Promise<void> {
  const commentRef = doc(firestore, 'comments', id);

  await deleteDoc(commentRef);
}
