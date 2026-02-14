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
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-sans text-text-light-primary dark:text-text-dark-primary">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center py-16 md:py-24 px-4 bg-background-off-white dark:bg-container-dark/20">
        <div className="w-full max-w-3xl">

          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Real-time Tracking
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-text-light-primary dark:text-text-dark-primary">
              Track Your <span className="text-accent">Repair</span>
            </h1>
            <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-lg mx-auto leading-relaxed">
              Enter your ticket details below to see the current status of your device repair.
            </p>
          </div>

          {!result ? (
            <div className="max-w-md mx-auto animate-in zoom-in-95 duration-500">
              <Card variant="default" className="p-8 md:p-10 shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-container-dark rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="ticketCode" className="block text-sm font-semibold text-text-light-primary dark:text-text-dark-primary ml-1">
                      Ticket Code
                    </label>
                    <Input
                      id="ticketCode"
                      placeholder="e.g. TR-8842"
                      value={ticketCode}
                      onChange={(e) => setTicketCode(e.target.value)}
                      required
                      className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary transition-all pl-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-text-light-primary dark:text-text-dark-primary ml-1">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="e.g. Anderson"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary transition-all pl-4"
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg border border-red-100 dark:border-red-800 flex items-center gap-2">
                      <span className="material-icons-outlined text-red-500 text-sm">error_outline</span>
                      <span>{error}</span>
                    </div>
                  )}

                  <Button type="submit" variant="primary" className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-all" disabled={loading}>
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
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
                    {session ? (
                         <div className="space-y-2">
                            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                                You are signed in as <span className="font-semibold text-text-light-primary dark:text-text-dark-primary">{session.user.name}</span>
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
                            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
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
              <Card className="overflow-hidden border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl bg-white dark:bg-container-dark">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
                          {result.device}
                        </h2>
                        <span className="px-3 py-1 rounded-full bg-white dark:bg-gray-700 text-xs font-bold text-text-light-secondary dark:text-text-dark-secondary border border-gray-200 dark:border-gray-600 uppercase tracking-wide">
                          {result.serviceType}
                        </span>
                      </div>
                      <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm flex items-center gap-2">
                        Ticket: <span className="font-mono font-bold text-primary bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">{result.ticketCode}</span>
                      </p>
                    </div>
                    {result.completionDate && (
                      <div className="text-right bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                        <span className="text-xs font-semibold text-text-light-secondary dark:text-text-dark-secondary uppercase tracking-wider block mb-1">Est. Completion</span>
                        <span className="font-bold text-text-light-primary dark:text-text-dark-primary text-lg">
                          {new Date(result.completionDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8 md:p-12 bg-white dark:bg-container-dark">
                  <RepairStatusStepper status={result.status as RepairStatus} className="mb-8" />

                  <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700">
                    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 md:p-8 border border-blue-100 dark:border-blue-800/30 flex flex-col md:flex-row items-center justify-between gap-6">

                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-white dark:bg-blue-900 rounded-xl shadow-sm flex items-center justify-center text-primary dark:text-blue-300 shrink-0">
                          <span className="material-icons-outlined">notifications_active</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-text-light-primary dark:text-text-dark-primary mb-1">Get Live Updates</h4>
                          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary max-w-sm">
                            Create an account to receive SMS & Email notifications about your repair status instantly.
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => router.push('/sign-in')}
                        className="whitespace-nowrap shadow-md hover:shadow-lg transition-all"
                      >
                        Enable Alerts
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 text-center border-t border-gray-100 dark:border-gray-700">
                  <Button variant="link" onClick={() => setResult(null)} className="text-sm text-text-light-secondary hover:text-text-light-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary">
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
