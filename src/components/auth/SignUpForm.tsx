'use client';

import { useState } from 'react';
import { signUp } from 'aws-amplify/auth';
// import { useRouter } from 'next/navigation'; // Not used yet

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  // const router = useRouter(); // Not used yet

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
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            givenName: formData.fullName.split(' ')[0] || '',
            familyName: formData.fullName.split(' ').slice(1).join(' ') || '',
            phoneNumber: formData.phoneNumber,
          },
        },
      });
      setSuccess(true);
    } catch (err: unknown) {
      setError((err as Error).message || 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-icons text-green-600 text-2xl">check</span>
          </div>
          <h2 className="text-2xl font-bold text-[#111218] font-montserrat mb-4">
            Check Your Email
          </h2>
          <p className="text-[#5f678c] mb-6">
            We&apos;ve sent you a confirmation link. Please check your email and click the link to verify your account.
          </p>
          <a
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-xl h-10 px-4 bg-[#3D5AFE] text-white text-sm font-bold hover:bg-[#304FFE] transition-colors duration-300"
          >
            Go to Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#111218] font-montserrat">
        Create Your Account
      </h2>
      
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-[#5f678c] mb-1">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full h-10 px-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-[#5f678c] mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full h-10 px-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#5f678c] mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full h-10 px-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300"
          />
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#5f678c] mb-1">
            Phone Number (Optional)
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full h-10 px-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#5f678c] mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full h-10 px-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300"
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#5f678c] mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
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
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-[#5f678c]">
          Already have an account?{' '}
          <a href="/sign-in" className="text-[#3D5AFE] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
