'use server';

import { revalidatePath } from 'next/cache';
import { getPosts, getPost, createPost, updatePost, deletePost } from '@/lib/firestore/posts';
import { getCurrentUser } from '@/utils/session';
import type { Post } from '@/types/post';
import type { CreatePostInput, UpdatePostInput } from '@/schemas/post.schema';

// Server Action: Get all posts
export async function getAllPostsAction(): Promise<Post[]> {
  try {
    return await getPosts();
  } catch (error) {
    console.error('Error in getAllPostsAction:', error);
    throw error;
  }
}

export async function getPostAction(id: string): Promise<Post | null> {
  try {
    if (!id) {
      throw new Error('Post ID is required');
    }
    return await getPost(id);
  } catch (error) {
    console.error('Error in getPostAction:', error);
    throw error;
  }
}

export async function createPostAction(
  data: CreatePostInput,
): Promise<{ success: boolean; post?: Post; error?: string }> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        error: 'You must be logged in to create a post',
      };
    }

    if (data.authorId !== currentUser.id) {
      return {
        success: false,
        error: 'Invalid author ID',
      };
    }

    const post = await createPost(data);
    revalidatePath('/', 'layout');
    revalidatePath('/posts');
    revalidatePath(`/post/${post.id}`);
    return { success: true, post };
  } catch (error) {
    console.error('Error in createPostAction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create post',
    };
  }
}

export async function updatePostAction(
  id: string,
  data: UpdatePostInput,
): Promise<{ success: boolean; post?: Post; error?: string }> {
  try {
    if (!id) {
      return { success: false, error: 'Post ID is required' };
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        error: 'You must be logged in to update a post',
      };
    }

    const existingPost = await getPost(id);

    if (!existingPost) {
      return {
        success: false,
        error: 'Post not found',
      };
    }

    if (existingPost.authorId !== currentUser.id) {
      return {
        success: false,
        error: 'You can only edit your own posts',
      };
    }

    const post = await updatePost(id, data);
    revalidatePath('/', 'layout');
    revalidatePath('/posts');
    revalidatePath(`/post/${id}`);
    revalidatePath(`/post/${id}/edit`);
    return { success: true, post };
  } catch (error) {
    console.error('Error in updatePostAction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update post',
    };
  }
}

export async function deletePostAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!id) {
      return { success: false, error: 'Post ID is required' };
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        error: 'You must be logged in to delete a post',
      };
    }

    const existingPost = await getPost(id);

    if (!existingPost) {
      return {
        success: false,
        error: 'Post not found',
      };
    }

    if (existingPost.authorId !== currentUser.id) {
      return {
        success: false,
        error: 'You can only delete your own posts',
      };
    }

    await deletePost(id);
    revalidatePath('/', 'layout');
    revalidatePath('/posts');
    revalidatePath(`/post/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Error in deletePostAction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete post',
    };
  }
}
