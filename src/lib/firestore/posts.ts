import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import type { CreatePostInput, UpdatePostInput } from '@/schemas/post.schema';
import { firestoreToPost } from '@/utils/post';
import type { Post } from '@/types/post';
import { firestore } from '@/configs/firebase';

export async function getPosts(): Promise<Post[]> {
  const postsRef = collection(firestore, 'posts');
  const q = query(postsRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  const posts: Post[] = [];
  for (const docSnapshot of querySnapshot.docs) {
    const post = await firestoreToPost(docSnapshot.id, docSnapshot.data());
    posts.push(post);
  }

  return posts;
}

export async function getPost(id: string): Promise<Post | null> {
  const postRef = doc(firestore, 'posts', id);
  const postSnap = await getDoc(postRef);

  if (!postSnap.exists()) {
    return null;
  }

  return firestoreToPost(postSnap.id, postSnap.data());
}

export async function createPost(data: CreatePostInput): Promise<Post> {
  const postsRef = collection(firestore, 'posts');
  const now = new Date();

  const postData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await addDoc(postsRef, postData);
  const newPost = await getPost(docRef.id);

  if (!newPost) {
    throw new Error('Failed to retrieve created post');
  }

  return newPost;
}

export async function updatePost(id: string, data: UpdatePostInput): Promise<Post> {
  const postRef = doc(firestore, 'posts', id);

  const postSnap = await getDoc(postRef);
  if (!postSnap.exists()) {
    throw new Error(`Post with id ${id} not found`);
  }

  const updateData = {
    ...data,
    updatedAt: new Date(),
  };

  await updateDoc(postRef, updateData);
  const updatedPost = await getPost(id);

  if (!updatedPost) {
    throw new Error('Failed to retrieve updated post');
  }

  return updatedPost;
}

export async function deletePost(id: string): Promise<void> {
  const postRef = doc(firestore, 'posts', id);

  const postSnap = await getDoc(postRef);
  if (!postSnap.exists()) {
    throw new Error(`Post with id ${id} not found`);
  }

  await deleteDoc(postRef);
}
