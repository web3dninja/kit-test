'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createPostSchema, type UpdatePostInput } from '@/schemas/post.schema';
import type { Post } from '@/types/post';
import type { User } from '@/types/user';
import { PostFormFields } from './post-form-fields';
import { Button } from '@/components/ui/button';
import { useUpdatePost } from '@/hooks/usePosts';

interface UpdatePostFormProps {
  initialData: Post;
  currentUser: User;
}

export function UpdatePostForm({ initialData, currentUser }: UpdatePostFormProps) {
  const updatePostMutation = useUpdatePost();

  const form = useForm<UpdatePostInput>({
    resolver: zodResolver(createPostSchema.partial()),
    defaultValues: {
      title: initialData.title,
      content: initialData.content,
      authorId: initialData.authorId,
    },
  });

  const handleSubmit = (data: UpdatePostInput) => {
    updatePostMutation.mutate({
      id: initialData.id,
      data: {
        ...data,
        authorId: currentUser.id,
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Post</CardTitle>
        <CardDescription>Make changes to your post</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <PostFormFields
              form={form}
              isLoading={updatePostMutation.isPending}
              currentUser={currentUser}
              isEdit
            />
            <div className="flex gap-3">
              <Button type="submit" disabled={updatePostMutation.isPending}>
                {updatePostMutation.isPending ? 'Saving...' : 'Save changes'}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={updatePostMutation.isPending}
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

