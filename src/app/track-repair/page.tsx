'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { getRepairStatus } from './actions';
import { RepairStatusStepper } from '@/components/ui/RepairStatusStepper';
import { RepairStatus } from '@/components/ui/RepairStatusStepper';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function TrackRepairPage() {
  const [ticketCode, setTicketCode] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const router = useRouter();

  // Check if user is authenticated
  const { data: session } = authClient.useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await getRepairStatus(ticketCode, lastName);
      if (response.error) {
        setError(response.error);
      } else {
        setResult(response.data);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 dark:text-white bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Gradients & Blobs to match Homepage/SignIn */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-40 dark:opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-100 via-transparent to-transparent opacity-40 dark:opacity-20 pointer-events-none" />

      <Header />

      <main className="flex-grow flex flex-col items-center justify-center py-16 md:py-24 px-4 relative z-10">
        <div className="w-full max-w-3xl">

          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Real-time Tracking
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
              Track Your <span className="text-accent">Repair</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
              Enter your ticket details below to see the current status of your device repair.
            </p>
          </div>

          {!result ? (
            <div className="max-w-md mx-auto animate-in zoom-in-95 duration-500">
              <Card variant="glass" className="p-8 md:p-10 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-white/50 dark:border-white/10 relative overflow-hidden">
                 {/* Subtle inner glow */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="ticketCode" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                      Ticket Code
                    </label>
                    <Input
                      id="ticketCode"
                      placeholder="e.g. TR-8842"
                      value={ticketCode}
                      onChange={(e) => setTicketCode(e.target.value)}
                      required
                      className="bg-white/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:ring-primary/50 focus:border-primary transition-all pl-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="e.g. Anderson"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="bg-white/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:ring-primary/50 focus:border-primary transition-all pl-4"
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl border border-red-100 dark:border-red-800 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  )}

                  <Button type="submit" variant="primary" className="w-full h-12 text-base shadow-lg shadow-orange-500/20 font-bold" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Searching...
                      </span>
                    ) : 'Track Repair'}
                  </Button>
                </form>

                {/* Sign In CTA Section */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                    {session ? (
                         <div className="space-y-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                You are signed in as <span className="font-semibold text-gray-900 dark:text-white">{session.user.name}</span>
                            </p>
                            <Button
                                variant="link"
                                onClick={() => router.push('/dashboard')}
                                className="text-primary hover:text-blue-700 font-bold"
                            >
                                Go to Dashboard &rarr;
                            </Button>
                         </div>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Already have an account?
                            </p>
                            <Button
                                variant="link"
                                onClick={() => router.push('/sign-in')}
                                className="text-primary hover:text-blue-700 font-bold p-0 h-auto"
                            >
                                Sign in to view all repairs
                            </Button>
                        </div>
                    )}
                </div>
              </Card>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <Card className="overflow-hidden border-0 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-gray-800">
                <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {result.device}
                        </h2>
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 uppercase tracking-wide">
                          {result.serviceType}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                        Ticket: <span className="font-mono font-bold text-primary bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">{result.ticketCode}</span>
                      </p>
                    </div>
                    {result.completionDate && (
                      <div className="text-right bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider block mb-1">Est. Completion</span>
                        <span className="font-bold text-gray-900 dark:text-white text-lg">
                          {new Date(result.completionDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8 md:p-12 bg-white dark:bg-gray-800">
                  <RepairStatusStepper status={result.status as RepairStatus} className="mb-8" />

                  <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 md:p-8 border border-blue-100 dark:border-blue-800/50 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                      {/* Decorative background circle */}
                      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>

                      <div className="flex items-center gap-5 relative z-10">
                        <div className="w-14 h-14 bg-white dark:bg-blue-900 rounded-2xl shadow-lg flex items-center justify-center text-primary dark:text-blue-300 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Get Live Updates</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm">
                            Create an account to receive SMS & Email notifications about your repair status instantly.
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => router.push('/sign-in')}
                        className="whitespace-nowrap shadow-lg shadow-orange-500/20 relative z-10"
                      >
                        Enable Alerts
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 text-center border-t border-gray-100 dark:border-gray-700">
                  <Button variant="link" onClick={() => setResult(null)} className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">
                    Check Another Repair
                  </Button>
                </div>
              </Card>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
