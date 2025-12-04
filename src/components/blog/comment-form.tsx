'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCommentSchema, type CreateCommentInput } from '@/schemas/comment.schema';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormSkeleton } from '@/components/ui/form-skeleton';
import { AuthRequired } from '@/components/auth/auth-required';
import { useCreateComment } from '@/hooks/useComments';
import { useAuthStore } from '@/store/auth-store';

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const user = useAuthStore(state => state.user);
  const isLoading = useAuthStore(state => state.isLoading);
  const createCommentMutation = useCreateComment();

  const form = useForm<Omit<CreateCommentInput, 'postId' | 'authorId'>>({
    resolver: zodResolver(createCommentSchema.omit({ postId: true, authorId: true })),
  });

  const onSubmit = (data: Omit<CreateCommentInput, 'postId' | 'authorId'>) => {
    if (!user) return;

    createCommentMutation.mutate({
      ...data,
      postId,
      authorId: user.id,
    });
  };

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (!user) {
    return <AuthRequired message="You must be logged in to leave a comment." />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your comment..."
                  rows={4}
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={createCommentMutation.isPending || form.formState.isSubmitting}
        >
          {createCommentMutation.isPending ? 'Adding...' : 'Add comment'}
        </Button>
      </form>
    </Form>
  );
}
