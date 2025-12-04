import { createPostSchema, updatePostSchema } from '@/schemas/post.schema';

describe('Post Schemas', () => {
  describe('createPostSchema', () => {
    it('should validate a valid post', () => {
      const validPost = {
        title: 'Test Post Title',
        content: 'This is a test post content with more than 20 characters',
        authorId: 1,
      };

      const result = createPostSchema.safeParse(validPost);
      expect(result.success).toBe(true);
    });

    it('should reject post with title too short', () => {
      const invalidPost = {
        title: 'Test',
        content: 'This is a test post content with more than 20 characters',
        authorId: 1,
      };

      const result = createPostSchema.safeParse(invalidPost);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContainEqual('title');
      }
    });

    it('should reject post with title too long', () => {
      const invalidPost = {
        title: 'a'.repeat(201),
        content: 'This is a test post content with more than 20 characters',
        authorId: 1,
      };

      const result = createPostSchema.safeParse(invalidPost);
      expect(result.success).toBe(false);
    });

    it('should reject post with content too short', () => {
      const invalidPost = {
        title: 'Test Post Title',
        content: 'Short',
        authorId: 1,
      };

      const result = createPostSchema.safeParse(invalidPost);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContainEqual('content');
      }
    });

    it('should reject post with content too long', () => {
      const invalidPost = {
        title: 'Test Post Title',
        content: 'a'.repeat(10001),
        authorId: 1,
      };

      const result = createPostSchema.safeParse(invalidPost);
      expect(result.success).toBe(false);
    });

    it('should reject post without authorId', () => {
      const invalidPost = {
        title: 'Test Post Title',
        content: 'This is a test post content with more than 20 characters',
      };

      const result = createPostSchema.safeParse(invalidPost);
      expect(result.success).toBe(false);
    });

    it('should reject post with invalid authorId', () => {
      const invalidPost = {
        title: 'Test Post Title',
        content: 'This is a test post content with more than 20 characters',
        authorId: -1,
      };

      const result = createPostSchema.safeParse(invalidPost);
      expect(result.success).toBe(false);
    });
  });

  describe('updatePostSchema', () => {
    it('should validate partial update with only title', () => {
      const update = {
        title: 'Updated Title',
      };

      const result = updatePostSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('should validate partial update with only content', () => {
      const update = {
        content: 'Updated content with more than 20 characters',
      };

      const result = updatePostSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('should validate empty update object', () => {
      const update = {};

      const result = updatePostSchema.safeParse(update);
      expect(result.success).toBe(true);
    });

    it('should reject invalid title in partial update', () => {
      const update = {
        title: 'Test',
      };

      const result = updatePostSchema.safeParse(update);
      expect(result.success).toBe(false);
    });
  });
});
