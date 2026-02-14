'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Fingerprint, Loader2, Mail } from 'lucide-react';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signIn.email({
        email,
        password,
        callbackURL: '/dashboard'
      }, {
        onRequest: () => setIsLoading(true),
        onSuccess: () => router.push('/dashboard'),
        onError: (ctx) => {
            setError(ctx.error.message || 'Invalid email or password');
            setIsLoading(false);
        }
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
      setIsLoading(false);
    }
  };

  const handlePasskeySignIn = async () => {
    // TODO: Implement Passkey when plugin is resolved
    alert("Passkey support is coming soon!");
  };

  return (
    <div className="w-full space-y-8">
      
      {/* Passkey Button - The "Modern" Way */}
      <div className="space-y-4">
        <Button
            variant="primary"
            className="w-full h-14 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3 transition-all active:scale-95"
            onClick={handlePasskeySignIn}
            disabled={isLoading}
            type="button"
        >
            {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin text-white/80" />
            ) : (
                <Fingerprint className="h-6 w-6" />
            )}
            Sign in with Passkey
        </Button>
        <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
                <span className="bg-white dark:bg-gray-800 px-4 text-gray-400 dark:text-gray-500">
                    Or use password
                </span>
            </div>
        </div>
      </div>

      <form onSubmit={handleSignIn} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
            Email Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-12 bg-gray-50 dark:bg-gray-900 border-transparent focus:bg-white dark:focus:bg-gray-800 transition-all"
                placeholder="you@example.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between ml-1">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-50 dark:bg-gray-900 border-transparent focus:bg-white dark:focus:bg-gray-800 transition-all"
            placeholder="••••••••"
          />
        </div>
        
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl border border-red-100 dark:border-red-800 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
        
        <Button
          type="submit"
          disabled={isLoading}
          variant="secondary"
          className="w-full font-bold h-12"
        >
          {isLoading ? (
             <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
             </span>
          ) : 'Sign In'}
        </Button>
      </form>
      
      <div className="pt-2 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          New customer?{' '}
          <a href="/sign-up" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-bold transition-colors">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
