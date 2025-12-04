import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useDeletePost } from '@/hooks/usePosts';

export function useDeletePostMutation(postId: string) {
  const router = useRouter();
  const deletePostMutation = useDeletePost();

  return {
    mutate: () => {
      deletePostMutation.mutate(postId, {
        onSuccess: () => {
          toast.success('Post successfully deleted');
          router.push('/');
        },
        onError: error => {
          toast.error(String(error));
        },
      });
    },
    isPending: deletePostMutation.isPending,
  };
}
