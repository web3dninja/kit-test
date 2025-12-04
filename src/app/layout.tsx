import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/globals.css';
import { ThemeProvider } from '@/providers';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/layout/header';
import { QueryProvider } from '@/providers/query';
import { AuthStoreProvider } from '@/providers/auth-store-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Blog | Kit Global',
  description: 'Blog platform on Next.js with Redux and Zod validation',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthStoreProvider>
              <Header />
              <main>{children}</main>
              <Toaster />
              {modal}
            </AuthStoreProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
