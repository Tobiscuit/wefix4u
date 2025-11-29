'use client';

import { useState } from 'react';
import { client } from '@/utils/amplify-client';
import { useRouter } from 'next/navigation';

export default function RepairIntakeForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    // Customer
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    
    // Device
    deviceType: 'phone',
    deviceModel: '',
    serialNumber: '',
    devicePassword: '',
    devicePattern: '',
    
    // Service
    serviceType: 'screen-replacement',
    description: '',
    estimatedCost: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 1. Create or Find Customer (Simplified: Always create for now)
      // In a real app, we'd search first.
      const { data: customer, errors: customerErrors } = await client.models.Customer.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      });

      if (customerErrors) throw new Error('Failed to create customer');
      if (!customer) throw new Error('Customer creation returned null');

      // 2. Create Repair
      const { errors: repairErrors } = await client.models.Repair.create({
        customerId: customer.id,
        deviceType: formData.deviceType,
        deviceModel: formData.deviceModel,
        serialNumber: formData.serialNumber,
        devicePassword: formData.devicePassword,
        devicePattern: formData.devicePattern,
        serviceType: formData.serviceType,
        description: formData.description,
        estimatedCost: Number(formData.estimatedCost),
        status: 'pending',
        estimatedCompletion: new Date(Date.now() + 86400000).toISOString(), // +1 day default
      });

      if (repairErrors) throw new Error('Failed to create repair');

      // Success!
      router.push('/admin/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error creating repair. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-8 rounded-2xl max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10"></div>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
              step >= s ? 'bg-trusted-blue text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Step 1: Customer */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-xl font-bold text-dark-text">Customer Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trusted-blue outline-none"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trusted-blue outline-none"
                placeholder="Doe"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trusted-blue outline-none"
                placeholder="john@example.com"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trusted-blue outline-none"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="bg-trusted-blue text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Next: Device
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Device */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-xl font-bold text-dark-text">Device Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="deviceType"
                value={formData.deviceType}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trusted-blue outline-none bg-white"
              >
                <option value="phone">Phone</option>
                <option value="tablet">Tablet</option>
                <option value="laptop">Laptop</option>
                <option value="console">Console</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input
                name="deviceModel"
                value={formData.deviceModel}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trusted-blue outline-none"
                placeholder="iPhone 13 Pro"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passcode (PIN)</label>
              <input
                name="devicePassword"
                value={formData.devicePassword}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trusted-blue outline-none"
                placeholder="123456"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pattern (Grid)</label>
              <input
                name="devicePattern"
                value={formData.devicePattern}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trusted-blue outline-none"
                placeholder="1-2-3-6"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-gray-500 font-medium hover:text-gray-700"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-trusted-blue text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Next: Service
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Service & Confirm */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-xl font-bold text-dark-text">Service Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trusted-blue outline-none bg-white"
              >
                <option value="screen-replacement">Screen Replacement</option>
                <option value="battery-replacement">Battery Replacement</option>
                <option value="charging-port">Charging Port Repair</option>
                <option value="water-damage">Water Damage</option>
                <option value="diagnostic">Diagnostic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description / Notes</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trusted-blue outline-none"
                placeholder="Cracked screen, touch not working..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost ($)</label>
              <input
                name="estimatedCost"
                type="number"
                value={formData.estimatedCost}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trusted-blue outline-none font-mono text-lg"
                placeholder="150.00"
              />
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-6">
            <h4 className="font-bold text-trusted-blue mb-2">Summary</h4>
            <p className="text-sm text-blue-800">
              {formData.firstName} {formData.lastName} - {formData.deviceModel} ({formData.serviceType})
            </p>
            <p className="text-xl font-bold text-trusted-blue mt-2">${formData.estimatedCost}</p>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="text-gray-500 font-medium hover:text-gray-700"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-action-orange text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <span className="material-icons animate-spin mr-2">refresh</span>
              ) : (
                <span className="material-icons mr-2">check</span>
              )}
              Create Repair Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
