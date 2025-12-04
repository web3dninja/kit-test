import { z } from 'zod';

// Schema for creating a comment
export const createCommentSchema = z.object({
  authorId: z.number().int().positive('Author ID is required'),
  content: z
    .string()
    .min(1, 'Comment is required')
    .min(3, 'Comment must be at least 3 characters')
    .max(1000, 'Comment must be no more than 1000 characters'),
  postId: z.string().min(1, 'Post ID is required'),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
