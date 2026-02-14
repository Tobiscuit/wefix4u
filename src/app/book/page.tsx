'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingWizard from '@/components/BookingWizard';

function BookingContent() {
  const searchParams = useSearchParams();
  const device = searchParams.get('device') || undefined;

  return (
    <main className="flex-1 py-12 px-4 md:px-8 bg-gray-50 dark:bg-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Start Your Repair
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Select your device and tell us what's wrong. We'll handle the rest.
          </p>
        </div>

        <BookingWizard initialDevice={device} />
      </div>
    </main>
  );
}

export default function BookPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <BookingContent />
      </Suspense>
      <Footer />
    </div>
  );
}
