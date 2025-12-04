'use client';

import { PostCard } from '../app/post/components/post-card';
import { AlertCircle } from 'lucide-react';
import type { Post } from '@/types/post';
import { motion } from 'framer-motion';

interface PostListProps {
  posts: Post[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="bg-muted mb-4 rounded-full p-4">
          <AlertCircle className="text-muted-foreground size-12" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">No posts</h3>
        <p className="text-muted-foreground mb-6">There are no posts yet. Create the first one!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid-list"
    >
      {posts.map(post => (
        <motion.div key={post.id} variants={itemVariants}>
          <PostCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
}
