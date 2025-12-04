'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as postsApi from '@/lib/firestore/posts';
import type { CreatePostInput, UpdatePostInput } from '@/schemas/post.schema';
import { toast } from 'sonner';

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: () => [...postKeys.lists()] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

export function usePost(id: string) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postsApi.getPost(id),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostInput) => postsApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.list() });
      toast.success('Post successfully created');
    },
    onError: error => {
      toast.error(String(error));
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostInput }) =>
      postsApi.updatePost(id, data),
    onSuccess: updatedPost => {
      queryClient.invalidateQueries({ queryKey: postKeys.list() });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(updatedPost.id) });
      toast.success('Post successfully updated');
    },
    onError: error => {
      toast.error(String(error));
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postsApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.list() });
      toast.success('Post successfully deleted');
    },
    onError: error => {
      toast.error(String(error));
    },
  });
}
