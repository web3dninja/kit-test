import { Spinner } from './spinner';
import { cn } from '@/lib/utils';

interface PageLoaderProps {
  className?: string;
  spinnerClassName?: string;
}

export function PageLoader({ className, spinnerClassName }: PageLoaderProps) {
  return (
    <div className={cn('flex min-h-[400px] items-center justify-center', className)}>
      <Spinner className={cn('size-8', spinnerClassName)} />
    </div>
  );
}
