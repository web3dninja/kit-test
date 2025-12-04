'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCommentAction } from '@/actions/comments';
import type { CreateCommentInput } from '@/schemas/comment.schema';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const commentKeys = {
  all: ['comments'] as const,
  lists: () => [...commentKeys.all, 'list'] as const,
  list: (postId: string) => [...commentKeys.lists(), postId] as const,
};

export function useCreateComment() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateCommentInput) => {
      const result = await createCommentAction(data);
      if (!result.success || !result.comment) {
        throw new Error(result.error || 'Failed to create comment');
      }
      return result.comment;
    },
    onSuccess: (newComment, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(variables.postId) });
      router.refresh();
      toast.success('Comment successfully created');
    },
    onError: error => {
      toast.error(String(error));
    },
  });
}
