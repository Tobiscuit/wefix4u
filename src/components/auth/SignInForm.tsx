'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Check if Amplify is configured
  const [isAmplifyConfigured, setIsAmplifyConfigured] = useState(false);

  useEffect(() => {
    // Simple check if we're in development mode
    setIsAmplifyConfigured(process.env.NODE_ENV === 'development' || window.location.hostname !== 'localhost');
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signIn({ username: email, password });
      router.push('/dashboard');
    } catch (err: unknown) {
      setError((err as Error).message || 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAmplifyConfigured) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-icons text-yellow-600 text-2xl">warning</span>
          </div>
          <h2 className="text-2xl font-bold text-[#111218] font-montserrat mb-4">
            Authentication Not Configured
          </h2>
          <p className="text-[#5f678c] mb-6">
            AWS Amplify backend needs to be deployed first. Please contact your developer to set up authentication.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#111218] font-montserrat">
        Sign In to Your Account
      </h2>
      
      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#5f678c] mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-10 px-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#5f678c] mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-10 px-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300"
          />
        </div>
        
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center rounded-xl h-10 px-4 bg-[#3D5AFE] text-white text-sm font-bold hover:bg-[#304FFE] disabled:opacity-50 transition-colors duration-300"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-[#5f678c]">
          Don't have an account?{' '}
          <a href="/sign-up" className="text-[#3D5AFE] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
