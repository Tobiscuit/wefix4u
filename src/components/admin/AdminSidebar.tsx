'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Dashboard', icon: 'dashboard', href: '/admin/dashboard' },
  { name: 'New Repair', icon: 'add_circle', href: '/admin/repairs/new' },
  { name: 'All Repairs', icon: 'build', href: '/admin/repairs' },
  { name: 'Customers', icon: 'people', href: '/admin/customers' },
  { name: 'Inventory', icon: 'inventory_2', href: '/admin/inventory' },
  { name: 'Settings', icon: 'settings', href: '/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-10 shadow-lg">
      <div className="p-6 border-b border-gray-100 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-trusted-blue tracking-tight">
          WE FIX <span className="text-action-orange">4U</span>
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-trusted-blue/10 text-trusted-blue font-semibold shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span
                className={`material-icons mr-3 text-xl transition-colors ${
                  isActive ? 'text-trusted-blue' : 'text-gray-400 group-hover:text-gray-600'
                }`}
              >
                {item.icon}
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors">
          <span className="material-icons mr-3 text-xl">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
