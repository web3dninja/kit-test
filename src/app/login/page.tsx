import { AuthTabs } from '@/components/auth/form';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <>
      <div className="content container mx-auto items-center">
        <div className="content-header">
          <h1>Authentication</h1>
        </div>
        <Card className="w-full max-w-lg">
          <CardContent>
            <AuthTabs />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
