'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Fingerprint, Loader2, Mail, Lock } from 'lucide-react';

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
    setIsLoading(true);
    setError('');
    try {
        // Attempt to sign in with Passkey using the core client method if available.
        // If the passkey plugin was installed, it would be signIn.passkey().
        // Since we are using the core client and server has webauthn enabled, we try this.
        // If 'signIn.passkey' is not typed, we might need to cast or handle it dynamically.
        // However, without the plugin, the method might not exist on the client object.
        // We will assume for this task that the user understands the limitation if the package is missing.

        // @ts-ignore - passkey method might be dynamically added by plugin or core
        if (signIn.passkey) {
             // @ts-ignore
            await signIn.passkey({
                callbackURL: '/dashboard'
            }, {
                onRequest: () => setIsLoading(true),
                onSuccess: () => router.push('/dashboard'),
                onError: (ctx: any) => {
                    setError(ctx.error.message || 'Passkey authentication failed');
                    setIsLoading(false);
                }
            });
        } else {
            // Fallback if plugin is not properly loaded
            alert("Passkey authentication is configured on the server but the client plugin is missing. Please install '@better-auth/passkey'.");
            setIsLoading(false);
        }
    } catch (err: any) {
        setError(err.message || 'An error occurred during passkey sign in');
        setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      
      {/* Passkey Button - The "Modern" Way */}
      <div className="space-y-4">
        <Button
            variant="primary"
            className="w-full h-14 text-lg shadow-sm flex items-center justify-center gap-3 transition-all"
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
                <span className="bg-white dark:bg-container-dark px-4 text-text-light-secondary dark:text-text-dark-secondary">
                    Or use password
                </span>
            </div>
        </div>
      </div>

      <form onSubmit={handleSignIn} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-text-light-primary dark:text-text-dark-primary ml-1">
            Email Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary transition-all"
                placeholder="you@example.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between ml-1">
            <label htmlFor="password" className="block text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
              Password
            </label>
            <a href="#" className="text-sm font-medium text-primary hover:text-blue-700 transition-colors">Forgot password?</a>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary transition-all"
                placeholder="••••••••"
            />
          </div>
        </div>
        
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg border border-red-100 dark:border-red-800 flex items-center gap-2">
            <span className="material-icons-outlined text-red-500 text-sm">error_outline</span>
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
          ) : 'Sign In with Password'}
        </Button>
      </form>
      
      <div className="pt-2 text-center">
        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
          New customer?{' '}
          <a href="/sign-up" className="text-accent hover:text-orange-700 font-bold transition-colors">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
