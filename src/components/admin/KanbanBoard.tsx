'use client';

import { useEffect, useState } from 'react';
import { client } from '@/utils/amplify-client';
import type { Schema } from '../../../amplify/data/resource';

type Repair = Schema['Repair']['type'];

const COLUMNS = [
  { id: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'diagnosed', label: 'Diagnosed', color: 'bg-blue-100 text-blue-800' },
  { id: 'inProgress', label: 'In Progress', color: 'bg-purple-100 text-purple-800' },
  { id: 'readyForPickup', label: 'Ready', color: 'bg-green-100 text-green-800' },
];

export default function KanbanBoard() {
  const [repairs, setRepairs] = useState<Repair[]>([]);

  useEffect(() => {
    const sub = client.models.Repair.observeQuery().subscribe({
      next: ({ items }) => {
        setRepairs(items);
      },
    });
    return () => sub.unsubscribe();
  }, []);

  const getRepairsByStatus = (status: string) => {
    return repairs.filter((r) => r.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full overflow-x-auto pb-4">
      {COLUMNS.map((col) => (
        <div key={col.id} className="flex flex-col h-full min-w-[280px]">
          {/* Column Header */}
          <div className={`p-4 rounded-t-xl font-bold flex justify-between items-center ${col.color} bg-opacity-50 backdrop-blur-sm`}>
            <span>{col.label}</span>
            <span className="bg-white bg-opacity-50 px-2 py-1 rounded-full text-xs">
              {getRepairsByStatus(col.id).length}
            </span>
          </div>

          {/* Column Body */}
          <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-b-xl p-4 flex-1 space-y-4 overflow-y-auto">
            {getRepairsByStatus(col.id).map((repair) => (
              <div
                key={repair.id}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-gray-400">#{repair.id.slice(0, 5)}</span>
                  <span className="material-icons text-gray-300 text-sm group-hover:text-trusted-blue">edit</span>
                </div>
                <h4 className="font-bold text-dark-text text-sm mb-1">{repair.deviceModel}</h4>
                <p className="text-xs text-body-text mb-3 line-clamp-2">{repair.description}</p>
                
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50">
                  <span className="text-xs font-medium text-gray-500">
                    {new Date(repair.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                    {repair.serviceType}
                  </span>
                </div>
              </div>
            ))}
            
            {getRepairsByStatus(col.id).length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm italic">
                No repairs
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
