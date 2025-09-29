'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3D5AFE] mx-auto mb-4"></div>
          <p className="text-[#5f678c]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-[#F5F5F5]" style={{fontFamily: 'Roboto, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Header />
            
            <main className="mt-8 flex-1">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-[#111218] font-montserrat">
                    Welcome to Your Dashboard
                  </h1>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center rounded-xl h-10 px-4 bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-[#F5F5F5] p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-[#111218] mb-2">My Repairs</h3>
                    <p className="text-[#5f678c] text-sm mb-4">Track your device repairs and their status</p>
                    <button className="text-[#3D5AFE] text-sm font-medium hover:underline">
                      View Repairs →
                    </button>
                  </div>
                  
                  <div className="bg-[#F5F5F5] p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-[#111218] mb-2">Schedule Appointment</h3>
                    <p className="text-[#5f678c] text-sm mb-4">Book a repair appointment online</p>
                    <button className="text-[#3D5AFE] text-sm font-medium hover:underline">
                      Book Now →
                    </button>
                  </div>
                  
                  <div className="bg-[#F5F5F5] p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-[#111218] mb-2">Account Settings</h3>
                    <p className="text-[#5f678c] text-sm mb-4">Manage your profile and preferences</p>
                    <button className="text-[#3D5AFE] text-sm font-medium hover:underline">
                      Settings →
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-[#111218] mb-2">Account Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Email:</span> {user.signInDetails?.loginId}</p>
                    <p><span className="font-medium">User ID:</span> {user.userId}</p>
                  </div>
                </div>
              </div>
            </main>
            
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
