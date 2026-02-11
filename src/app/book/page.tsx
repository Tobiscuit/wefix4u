'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

function BookingContent() {
  const searchParams = useSearchParams();
  const [deviceType, setDeviceType] = useState('phone-repair');
  const [serviceType, setServiceType] = useState('');
  
  useEffect(() => {
    const device = searchParams.get('device');
    const service = searchParams.get('service');
    
    if (device) setDeviceType(device);
    if (service) setServiceType(service);
  }, [searchParams]);

  const serviceTitleMap: Record<string, string> = {
    'phone-repair': 'Phone Repair',
    'laptop-repair': 'Computer Repair',
    'console-repair': 'Game Console Repair',
    'tablet-repair': 'Tablet Repair'
  };

  const getServiceTitle = () => {
    const baseTitle = serviceTitleMap[deviceType] || 'Repair';
    if (serviceType) {
      // Convert kebab-case to Title Case (e.g., screen-replacement -> Screen Replacement)
      const detail = serviceType
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return `${baseTitle} - ${detail}`;
    }
    return baseTitle;
  };

  return (
    <main className="flex-1 py-12 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Schedule Your Repair
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Fast, reliable service for your devices. Get a free quote today.
          </p>
        </div>

        {/* Selection Indicators */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
           <div className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${deviceType ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-gray-200 text-gray-600'}`}>
              Device: {serviceTitleMap[deviceType] || deviceType}
           </div>
           {serviceType && (
             <div className="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                Service: {serviceType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
             </div>
           )}
        </div>

        <BookingForm 
          deviceType={deviceType} 
          serviceType={serviceType || 'general-inquiry'} 
          serviceTitle={getServiceTitle()} 
        />
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
