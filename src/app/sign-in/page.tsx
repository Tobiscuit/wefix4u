'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignInForm from '@/components/auth/SignInForm';
import { Card } from '@/components/ui/Card';

export default function SignInPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 font-sans text-gray-900 dark:text-white relative overflow-hidden">
      {/* Background Gradients & Blobs to match Homepage */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-40 dark:opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-100 via-transparent to-transparent opacity-40 dark:opacity-20 pointer-events-none" />

      <Header />

      <main className="flex-grow flex items-center justify-center py-20 px-4 relative z-10">
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Sign in to manage your repairs
            </p>
          </div>

          <Card variant="glass" className="p-8 md:p-10 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-white/50 dark:border-white/10 relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
            <SignInForm />
          </Card>

          <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-500 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Secure 256-bit SSL Encrypted</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
