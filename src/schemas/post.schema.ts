import { z } from 'zod';

// Schema for creating a new blog post
export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must be no more than 200 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .min(20, 'Content must be at least 20 characters')
    .max(10000, 'Content must be no more than 10000 characters'),
  authorId: z.number().int().positive('Author ID is required'),
});

// Schema for updating an existing blog post
export const updatePostSchema = createPostSchema.partial();

// Infer TypeScript types from schemas
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
