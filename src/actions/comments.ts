'use server';

import { revalidatePath } from 'next/cache';
import { getCommentsByPostId, createComment, deleteComment } from '@/lib/firestore/comments';
import { getCurrentUser } from '@/utils/session';
import type { Comment } from '@/types/comment';
import type { CreateCommentInput } from '@/schemas/comment.schema';

export async function getCommentsAction(postId: string): Promise<Comment[]> {
  try {
    if (!postId) {
      console.error('Post ID is required');
      return [];
    }
    const comments = await getCommentsByPostId(postId);
    return comments;
  } catch (error) {
    console.error('Error in getCommentsAction:', error);
    console.error('Error details:', error);
    return []; // Return empty array instead of throwing
  }
}

export async function createCommentAction(
  data: CreateCommentInput,
): Promise<{ success: boolean; comment?: Comment; error?: string }> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        error: 'You must be logged in to create a comment',
      };
    }

    if (data.authorId !== currentUser.id) {
      return {
        success: false,
        error: 'Invalid author ID',
      };
    }

    const comment = await createComment(data);
    revalidatePath(`/post/${data.postId}`);
    return { success: true, comment };
  } catch (error) {
    console.error('Error in createCommentAction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create comment',
    };
  }
}

export async function deleteCommentAction(
  id: string,
  postId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!id) {
      return { success: false, error: 'Comment ID is required' };
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        error: 'You must be logged in to delete a comment',
      };
    }

    await deleteComment(id);
    revalidatePath(`/post/${postId}`);
    return { success: true };
  } catch (error) {
    console.error('Error in deleteCommentAction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete comment',
    };
  }
}
