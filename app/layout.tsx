'use client';
import { Navbar } from './components/layout/Navbar';
import './globals.css';
import { useAuth } from '../app/hooks/useAuth';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <Navbar />
        <main className="w-full">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}