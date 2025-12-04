import type { User } from './user';

export interface Comment {
  id: string;
  postId: string;
  authorId: number;
  author?: User;
  content: string;
  createdAt: string;
}
