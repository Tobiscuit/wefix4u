'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignInForm from '@/components/auth/SignInForm'; // Assuming I updated/created this component
import { Card } from '@/components/ui/Card';

export default function SignInPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-sans text-text-light-primary dark:text-text-dark-primary">
      <Header />

      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-900 dark:to-gray-900/50">
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-light-primary dark:text-text-dark-primary mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Sign in to manage your repairs and devices
            </p>
          </div>

          <Card variant="glass" className="p-8 md:p-10 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70">
            <SignInForm />
          </Card>

          <div className="mt-8 text-center text-sm text-text-light-secondary dark:text-text-dark-secondary">
            <p>Protected by industry standard encryption.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
