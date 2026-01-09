import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/inventory', label: 'Inventory', icon: '📦' },
    { path: '/departments', label: 'Departments', icon: '🏢' },
    { path: '/users', label: 'Users', icon: '👥' },
    { path: '/roles', label: 'Roles', icon: '🔐' },
    { path: '/workflows', label: 'Workflows', icon: '⚡' },
    { path: '/audit', label: 'Audit Logs', icon: '📋' },
    { path: '/company', label: 'Company', icon: '🏛️' }
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">ERP System</h2>
      </div>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 mb-2 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;