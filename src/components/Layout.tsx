import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, Plus, Menu, X, Home, User, LogOut, Bell, Search } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Profile', href: '/profile', icon: User },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderNavItem = (item: typeof navItems[0]) => {
    const isActive = location.pathname === item.href;
    return (
      <Link
        key={item.name}
        to={item.href}
        className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <item.icon className="mr-3 h-5 w-5" />
        {item.name}
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex items-center px-4 py-5">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Users className="h-6 w-6 text-white" />
        </div>
        <span className="ml-3 text-xl font-bold text-gray-900">SynergySphere</span>
      </div>
      <nav className="flex-1 px-2 space-y-1">{navItems.map(renderNavItem)}</nav>
      <div className="flex-shrink-0 p-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-sm font-medium text-white">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs font-medium text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="p-1 rounded-md text-gray-400 hover:text-gray-600">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 max-w-xs w-full">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          {sidebarContent}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">{sidebarContent}</div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Topbar */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200 lg:hidden">
          <button
            className="h-10 w-10 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="text-lg font-semibold">SynergySphere</span>
          <div className="flex items-center space-x-3">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
