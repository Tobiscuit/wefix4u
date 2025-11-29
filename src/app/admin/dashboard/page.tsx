import KanbanBoard from '@/components/admin/KanbanBoard';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-dark-text">Dashboard</h2>
          <p className="text-body-text mt-1">Welcome back, Technician.</p>
        </div>
        <button className="bg-action-orange text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all flex items-center">
          <span className="material-icons mr-2">add</span>
          New Repair
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Repairs', value: '12', icon: 'build', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Quotes', value: '4', icon: 'request_quote', color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Ready for Pickup', value: '3', icon: 'check_circle', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Revenue (Today)', value: '$450', icon: 'payments', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-6 rounded-2xl flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <span className={`material-icons text-2xl ${stat.color}`}>{stat.icon}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-dark-text">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity / Kanban Placeholder */}
      <div className="glass-panel p-6 rounded-2xl overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-dark-text">Repair Status</h3>
          <button className="text-sm text-trusted-blue font-medium hover:underline">View All</button>
        </div>
        <div className="h-[500px]">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
}
