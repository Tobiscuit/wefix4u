'use client';

import { useState } from 'react';
import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader2, User, Mail, Lock, Phone } from 'lucide-react';

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await signUp.email({
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`,
        callbackURL: '/dashboard',
      }, {
        onRequest: () => setIsLoading(true),
        onSuccess: () => router.push('/dashboard'),
        onError: (ctx) => {
            setError(ctx.error.message || 'An error occurred during sign up');
            setIsLoading(false);
        }
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
              First Name
            </label>
            <div className="relative group">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                  className="pl-12 bg-white/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:ring-primary/50 focus:border-primary transition-all"
                />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
              Last Name
            </label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Doe"
              className="bg-white/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
            Email Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="pl-12 bg-white/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
            Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <div className="relative group">
            <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="pl-12 bg-white/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
            Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="pl-12 bg-white/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
            Confirm Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="pl-12 bg-white/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
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
          className="w-full font-bold h-12 mt-4"
        >
          {isLoading ? (
             <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating Account...
             </span>
          ) : 'Create Account'}
        </Button>
      </form>
      
      <div className="pt-2 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <a href="/sign-in" className="text-primary hover:text-blue-700 font-bold transition-colors">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
