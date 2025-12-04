'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createPostSchema, type CreatePostInput } from '@/schemas/post.schema';
import { PostFormFields } from './post-form-fields';
import { Button } from '@/components/ui/button';
import type { User } from '@/types/user';
import { useCreatePost } from '@/hooks/usePosts';

interface CreatePostFormProps {
  currentUser: User;
}

export function CreatePostForm({ currentUser }: CreatePostFormProps) {
  const createPostMutation = useCreatePost();

  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      authorId: currentUser.id,
    },
  });

  const handleSubmit = (data: CreatePostInput) => {
    createPostMutation.mutate({ ...data, authorId: currentUser.id });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
        <CardDescription>Fill out the form to create a new post</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <PostFormFields
              form={form}
              isLoading={createPostMutation.isPending}
              currentUser={currentUser}
            />
            <div className="flex gap-3">
              <Button type="submit" disabled={createPostMutation.isPending}>
                {createPostMutation.isPending ? 'Saving...' : 'Create post'}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={createPostMutation.isPending}
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
