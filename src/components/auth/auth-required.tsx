import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

interface AuthRequiredProps {
  message?: string;
  title?: string;
  className?: string;
}

export function AuthRequired({
  message = 'You must be logged in to access this page.',
  title = 'Authentication Required',
  className,
}: AuthRequiredProps) {
  return (
    <div className={className}>
      <Alert>
        <LogIn className="size-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-2">{message}</AlertDescription>
        <div className="mt-4">
          <Button asChild>
            <Link href="/login">
              <LogIn className="mr-2 size-4" />
              Login
            </Link>
          </Button>
        </div>
      </Alert>
    </div>
  );
}
