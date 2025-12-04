'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import type { CreatePostInput, UpdatePostInput } from '@/schemas/post.schema';
import type { User } from '@/types/user';

interface PostFormFieldsProps<T extends CreatePostInput | UpdatePostInput> {
  form: UseFormReturn<T>;
  currentUser: User;
  isLoading?: boolean;
  isEdit?: boolean;
}

export function PostFormFields<T extends CreatePostInput | UpdatePostInput>({
  form,
  isLoading,
}: PostFormFieldsProps<T>) {
  return (
    <>
      <FormField
        control={form.control as any}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Title <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter post title" disabled={isLoading} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control as any}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Content <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Write your post here..."
                rows={12}
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
