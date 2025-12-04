import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

interface AccessDeniedProps {
  message?: string;
  title?: string;
  backUrl?: string;
  backLabel?: string;
  className?: string;
}

export function AccessDenied({
  message = 'You do not have permission to access this resource.',
  title = 'Access Denied',
  backUrl = '/',
  backLabel = 'Go Back',
  className,
}: AccessDeniedProps) {
  return (
    <div className={className}>
      <Alert variant="destructive">
        <ShieldAlert className="size-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-2">{message}</AlertDescription>
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link href={backUrl}>{backLabel}</Link>
          </Button>
        </div>
      </Alert>
    </div>
  );
}
