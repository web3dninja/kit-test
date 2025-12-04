import type { User } from './user';

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: number;
  author?: User;
  createdAt: string;
  updatedAt: string;
}
