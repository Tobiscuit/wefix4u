'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, signOut, type AuthUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

const client = generateClient<Schema>();

type Repair = Schema['Repair']['type'];

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        // Fetch user's repairs
        const { data: userRepairs } = await client.models.Repair.list({
          authMode: 'userPool',
        });
        // Sort by updated/created date desc
        setRepairs(userRepairs.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        router.push('/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'readyForPickup':
        return 'bg-green-100 text-green-800';
      case 'inProgress':
        return 'bg-purple-100 text-purple-800';
      case 'diagnosed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount?: number | null) => {
    if (amount === undefined || amount === null) return 'Pending Quote';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3D5AFE] mx-auto mb-4"></div>
          <p className="text-[#5f678c]">Loading your dashboard...</p>
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
              <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-[#111218] font-montserrat">
                      Welcome Back
                    </h1>
                    <p className="text-[#5f678c] mt-1">Manage your repairs and appointments</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center rounded-xl h-10 px-6 bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                </div>
                
                {/* Active Repairs Section */}
                <h2 className="text-xl font-bold text-[#111218] mb-4">Your Repairs</h2>
                
                {repairs.length === 0 ? (
                  <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
                    <div className="w-16 h-16 bg-blue-50 text-[#3D5AFE] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="material-icons text-3xl">devices</span>
                    </div>
                    <h3 className="text-lg font-medium text-[#111218] mb-2">No Active Repairs</h3>
                    <p className="text-[#5f678c] mb-6">You don't have any repairs in progress right now.</p>
                    <button 
                      onClick={() => router.push('/services')}
                      className="bg-[#3D5AFE] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#304FFE] transition-colors"
                    >
                      Start a New Repair
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {repairs.map((repair) => (
                      <div key={repair.id} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-[#111218]">
                                {repair.deviceModel}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(repair.status || 'pending')}`}>
                                {repair.status?.replace(/([A-Z])/g, ' $1').trim() || 'Pending'}
                              </span>
                            </div>
                            <p className="text-[#5f678c] text-sm mb-1">
                              Service: <span className="text-[#111218] font-medium">{repair.serviceType}</span>
                            </p>
                            <p className="text-[#5f678c] text-sm">
                              Serial: <span className="font-mono">{repair.serialNumber || 'N/A'}</span>
                            </p>
                          </div>
                          
                          <div className="text-left md:text-right">
                            <p className="text-sm text-[#5f678c] mb-1">Estimated Cost</p>
                            <p className="text-xl font-bold text-[#3D5AFE]">
                              {formatCurrency(repair.estimatedCost)}
                            </p>
                            {repair.estimatedCompletion && (
                              <p className="text-xs text-[#5f678c] mt-2">
                                Est. Completion: {new Date(repair.estimatedCompletion).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Progress Bar (Visual only for now) */}
                        <div className="mt-6">
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#3D5AFE] rounded-full transition-all duration-500"
                              style={{ 
                                width: repair.status === 'completed' || repair.status === 'readyForPickup' ? '100%' 
                                     : repair.status === 'inProgress' ? '60%' 
                                     : repair.status === 'diagnosed' ? '30%' 
                                     : '10%' 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all group" onClick={() => router.push('/services')}>
                  <div className="w-12 h-12 bg-blue-50 text-[#3D5AFE] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#3D5AFE] group-hover:text-white transition-colors">
                    <span className="material-icons">add</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111218] mb-2">Book New Repair</h3>
                  <p className="text-[#5f678c] text-sm">Schedule a service for another device</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <span className="material-icons">settings</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111218] mb-2">Profile Settings</h3>
                  <p className="text-[#5f678c] text-sm">Update your contact info and preferences</p>
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
