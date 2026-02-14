'use client'

import { useState } from 'react';
import { updateStatus } from './actions';
import { Loader2 } from 'lucide-react';

export default function RepairStatusSelect({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    await updateStatus(id, e.target.value);
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentStatus}
        onChange={handleChange}
        disabled={loading}
        className="text-sm border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        <option value="received">Received</option>
        <option value="diagnosed">Diagnosed</option>
        <option value="in-progress">In Progress</option>
        <option value="ready">Ready for Pickup</option>
        <option value="picked-up">Picked Up</option>
      </select>
      {loading && <Loader2 className="h-4 w-4 animate-spin text-blue-500" />}
    </div>
  );
}
