'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { Smartphone, Laptop, Gamepad2, Tablet, ArrowRight, Check, ChevronLeft, Calendar, User, Search } from 'lucide-react';

const client = generateClient<Schema>({ authMode: 'apiKey' });

interface WizardProps {
  initialDevice?: string;
}

type Step = 'device' | 'brand' | 'issue' | 'details' | 'success';

export default function BookingWizard({ initialDevice }: WizardProps) {
  const [step, setStep] = useState<Step>('device');
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  
  const [selections, setSelections] = useState({
    device: initialDevice || '',
    brand: '',
    issue: '',
    details: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

  // Auto-advance if initialDevice is present
  useEffect(() => {
    if (initialDevice) {
      setSelections(prev => ({ ...prev, device: initialDevice }));
      setStep('brand');
    }
  }, [initialDevice]);

  const nextStep = (next: Step) => {
    setDirection('forward');
    setStep(next);
  };

  const prevStep = (prev: Step) => {
    setDirection('back');
    setStep(prev);
  };

  const updateSelection = (key: string, value: any) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await client.models.RepairInquiry.create({
        name: selections.details.name,
        email: selections.details.email,
        phone: selections.details.phone,
        message: `Device: ${selections.device}, Brand: ${selections.brand}, Issue: ${selections.issue}. ${selections.details.message}`,
        deviceType: selections.device,
        serviceType: selections.issue,
        status: 'new'
      });
      nextStep('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  // --- Step Components ---

  const DeviceStep = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">What needs fixing?</h2>
      <div className="grid grid-cols-2 gap-4">
        {[
          { id: 'phone-repair', label: 'Phone', icon: Smartphone },
          { id: 'laptop-repair', label: 'Computer', icon: Laptop },
          { id: 'console-repair', label: 'Console', icon: Gamepad2 },
          { id: 'tablet-repair', label: 'Tablet', icon: Tablet },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              updateSelection('device', item.id);
              nextStep('brand');
            }}
            className={`p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] ${
              selections.device === item.id 
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500'
            }`}
          >
            <item.icon className={`w-10 h-10 ${selections.device === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
            <span className="font-semibold text-gray-900 dark:text-white">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const BrandStep = () => {
    const brands = {
      'phone-repair': ['iPhone', 'Samsung', 'Google Pixel', 'Other'],
      'laptop-repair': ['MacBook', 'Dell', 'HP', 'Lenovo', 'Other'],
      'console-repair': ['PlayStation', 'Xbox', 'Nintendo', 'Other'],
      'tablet-repair': ['iPad', 'Samsung Tab', 'Surface', 'Other']
    }[selections.device] || ['Other'];

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Which brand is it?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => {
                updateSelection('brand', brand);
                nextStep('issue');
              }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 hover:shadow-md transition-all font-medium text-gray-700 dark:text-gray-200"
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const IssueStep = () => {
    const issues = [
      'Cracked Screen', 'Battery Issue', 'Water Damage', 'Charging Port', 'Won\'t Turn On', 'Other'
    ];

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">What's the problem?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {issues.map((issue) => (
            <button
              key={issue}
              onClick={() => {
                updateSelection('issue', issue);
                nextStep('details');
              }}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 hover:shadow-md transition-all text-left group"
            >
              <span className="font-medium text-gray-700 dark:text-gray-200">{issue}</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const DetailsStep = () => (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Almost there!</h2>
        <p className="text-gray-500 mt-2">Where should we send your quote?</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl space-y-2 mb-6">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Smartphone className="w-4 h-4 mr-2" />
          <span className="font-medium">{selections.brand} {selections.device.split('-')[0]}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <User className="w-4 h-4 mr-2" />
          <span className="font-medium">{selections.issue}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="John Doe"
            value={selections.details.name}
            onChange={(e) => updateSelection('details', { ...selections.details, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            required
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="john@example.com"
            value={selections.details.email}
            onChange={(e) => updateSelection('details', { ...selections.details, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
          <input
            required
            type="tel"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="(555) 123-4567"
            value={selections.details.phone}
            onChange={(e) => updateSelection('details', { ...selections.details, phone: e.target.value })}
          />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Details (Optional)</label>
            <textarea
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Any other symptoms?"
                rows={3}
                value={selections.details.message}
                onChange={(e) => updateSelection('details', { ...selections.details, message: e.target.value })}
            />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {status === 'submitting' ? (
          <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        ) : (
          <>
            Get My Free Quote
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </button>
    </form>
  );

  const SuccessStep = () => (
    <div className="text-center py-12 animate-in zoom-in duration-300">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Request Received!</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
        We've sent a confirmation to <strong>{selections.details.email}</strong>. A technician will review your {selections.brand} issue and send you a quote within 1 hour.
      </p>
      <button
        onClick={() => window.location.href = '/'}
        className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity"
      >
        Back to Home
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      {step !== 'success' && (
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            <span>Step {['device', 'brand', 'issue', 'details'].indexOf(step) + 1} of 4</span>
            <button 
                onClick={() => {
                    if (step === 'brand') prevStep('device');
                    if (step === 'issue') prevStep('brand');
                    if (step === 'details') prevStep('issue');
                }}
                disabled={step === 'device'}
                className="flex items-center hover:text-gray-900 dark:hover:text-white disabled:opacity-0 transition-opacity"
            >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </button>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${(['device', 'brand', 'issue', 'details'].indexOf(step) + 1) * 25}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white dark:bg-gray-900/50 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 min-h-[400px]">
        {step === 'device' && <DeviceStep />}
        {step === 'brand' && <BrandStep />}
        {step === 'issue' && <IssueStep />}
        {step === 'details' && <DetailsStep />}
        {step === 'success' && <SuccessStep />}
      </div>
    </div>
  );
}
