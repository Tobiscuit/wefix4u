'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

const client = generateClient<Schema>();

export default function AdminDashboard() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Schema['RepairInquiry']['type'][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
    fetchInquiries();
  }, []);

  async function checkUser() {
    try {
      await getCurrentUser();
    } catch {
      router.push('/sign-in');
    }
  }

  async function fetchInquiries() {
    try {
      const { data: items } = await client.models.RepairInquiry.list({
        authMode: 'userPool'
      });
      // Sort by creation time (newest first) - assuming createdAt exists on the model
      setInquiries(items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleStatusChange = async (id: string, newStatus: Schema['RepairInquiry']['type']['status']) => {
    try {
      await client.models.RepairInquiry.update({
        id,
        status: newStatus
      });
      fetchInquiries(); // Refresh list
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (isLoading) return <div className="p-8 text-center">Loading dashboard...</div>;

  const stats = [
    { label: 'New Inquiries', value: inquiries.filter(i => i.status === 'new').length, icon: 'mark_email_unread', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Contacted', value: inquiries.filter(i => i.status === 'contacted').length, icon: 'contact_phone', color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Converted', value: inquiries.filter(i => i.status === 'converted').length, icon: 'verified', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Archived', value: inquiries.filter(i => i.status === 'archived').length, icon: 'archive', color: 'text-gray-600', bg: 'bg-gray-50' },
  ];

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-500 mt-1">Manage repair inquiries and bookings.</p>
        </div>
        <div className="flex gap-4">
            <button 
                onClick={fetchInquiries}
                className="bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center"
            >
                <span className="material-icons mr-2">refresh</span>
                Refresh
            </button>
            <button 
                onClick={handleSignOut}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 flex items-center"
            >
                <span className="material-icons mr-2">logout</span>
                Sign Out
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <span className={`material-icons text-2xl ${stat.color}`}>{stat.icon}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Inquiries List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Recent Inquiries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Device & Issue</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inquiries.length === 0 ? (
                <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        No inquiries found. Waiting for new customers!
                    </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{inquiry.name}</div>
                        <div className="text-sm text-gray-500">{inquiry.email}</div>
                        <div className="text-sm text-gray-500">{inquiry.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 capitalize">{inquiry.deviceType.replace('-', ' ')}</div>
                        <div className="text-sm text-gray-500">{inquiry.serviceType}</div>
                        {inquiry.message && (
                            <div className="mt-1 text-xs text-gray-400 max-w-xs truncate" title={inquiry.message}>
                                "{inquiry.message}"
                            </div>
                        )}
                    </td>
                    <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                            inquiry.status === 'contacted' ? 'bg-orange-100 text-orange-800' :
                            inquiry.status === 'converted' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'}`}>
                        {inquiry.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(inquiry.createdAt).toLocaleDateString()} <br/>
                        {new Date(inquiry.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </td>
                    <td className="px-6 py-4">
                        <select 
                        className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={inquiry.status || 'new'}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value as any)}
                        >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="archived">Archived</option>
                        </select>
                    </td>
                    </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
