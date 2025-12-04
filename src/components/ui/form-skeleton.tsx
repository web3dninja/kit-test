import { cn } from '@/lib/utils';

interface FormSkeletonProps {
  className?: string;
}

export function FormSkeleton({ className }: FormSkeletonProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="h-20 animate-pulse rounded-md bg-muted" />
      <div className="h-32 animate-pulse rounded-md bg-muted" />
    </div>
  );
}
