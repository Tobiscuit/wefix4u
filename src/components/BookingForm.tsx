'use client';

import { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>({ authMode: 'apiKey' });

interface BookingFormProps {
  deviceType: string;
  serviceType: string;
  serviceTitle: string;
}

export default function BookingForm({ deviceType, serviceType, serviceTitle }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await client.models.RepairInquiry.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        deviceType,
        serviceType,
        status: 'new'
      });
      setStatus('success');
      // Keep name for personalization, clear others if needed, but form is hidden on success
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (status === 'success') {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm mt-8 mb-16 mx-4 md:mx-20 lg:mx-40">
        <div className="max-w-[960px] mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-icons text-3xl">check_circle</span>
          </div>
          <h3 className="text-[#111218] text-2xl font-bold mb-4 font-montserrat">Quote Request Received!</h3>
          <p className="text-[#5f678c] mb-8 max-w-lg mx-auto">
            Thanks, {formData.name.split(' ')[0]}! We've received your request for {serviceTitle}. Our team will review the details and contact you shortly at {formData.phone} or {formData.email} to confirm your appointment.
          </p>
          <button 
            onClick={() => {
              setStatus('idle');
              setFormData({ name: '', email: '', phone: '', message: '' });
            }}
            className="inline-flex h-10 px-6 items-center justify-center rounded-xl bg-[#3D5AFE] text-white font-bold hover:bg-[#304FFE] transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm mt-8 mb-16 mx-4 md:mx-20 lg:mx-40">
      <div className="max-w-[960px] mx-auto">
        <h2 className="text-center text-[#111218] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6 font-montserrat">
          Get Your {serviceTitle} Quote
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#5f678c] mb-1" htmlFor="name">Name</label>
              <input 
                className="w-full h-10 px-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300 outline-none" 
                id="name" 
                name="name" 
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#5f678c] mb-1" htmlFor="email">Email</label>
              <input 
                className="w-full h-10 px-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300 outline-none" 
                id="email" 
                name="email" 
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#5f678c] mb-1" htmlFor="phone">Phone</label>
            <input 
              className="w-full h-10 px-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300 outline-none" 
              id="phone" 
              name="phone" 
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#5f678c] mb-1" htmlFor="message">Message (Optional)</label>
            <textarea 
              className="w-full p-4 rounded-xl border border-gray-300 focus:ring-[#3D5AFE] focus:border-[#3D5AFE] transition duration-300 outline-none" 
              id="message" 
              name="message" 
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about the issue (e.g., model number, how it happened)..."
            />
          </div>
          
          <div className="text-center">
            <button 
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-8 bg-[#3D5AFE] text-white text-sm font-bold leading-normal tracking-[0.015em] mx-auto hover:bg-[#304FFE] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform active:scale-95" 
              type="submit"
              disabled={status === 'submitting'}
            >
              <span className="truncate">{status === 'submitting' ? 'Sending Request...' : 'Request Quote'}</span>
            </button>
            {status === 'error' && (
              <p className="text-red-500 mt-3 text-sm font-medium bg-red-50 py-2 px-4 rounded-lg inline-block">
                Unable to submit request. Please try again or call us directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
