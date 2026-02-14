'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignInForm from '@/components/auth/SignInForm';
import { Card } from '@/components/ui/Card';

export default function SignInPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-sans text-text-light-primary dark:text-text-dark-primary">
      <Header />

      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-background-off-white dark:bg-container-dark/20">
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-light-primary dark:text-text-dark-primary mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Sign in to manage your repairs
            </p>
          </div>

          <Card variant="default" className="p-8 md:p-10 shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-container-dark rounded-xl">
            <SignInForm />
          </Card>

          <div className="mt-8 text-center text-xs text-text-light-secondary dark:text-text-dark-secondary flex items-center justify-center gap-2">
            <span className="material-icons-outlined text-green-500 text-sm">lock</span>
            <span>Secure 256-bit SSL Encrypted</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
