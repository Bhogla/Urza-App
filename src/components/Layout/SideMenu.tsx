import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home,
  Users,
  Gift,
  Trophy,
  CreditCard,
  Building2,
  FileCheck,
  Calculator,
  Bell,
  LogOut,
  X
} from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/referrals', icon: Users, label: 'My Referrals' },
    { path: '/redeem', icon: Gift, label: 'Redeem' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/transactions', icon: CreditCard, label: 'Transactions' },
    { path: '/bank-details', icon: Building2, label: 'Bank Details' },
    { path: '/kyc', icon: FileCheck, label: 'KYC' },
    { path: '/calculator', icon: Calculator, label: 'Savings Calculator' },
    { path: '/announcements', icon: Bell, label: 'Announcements' },
  ];

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="gradient-primary p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Urza Rewards</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            {user && (
              <div className="flex items-center space-x-3">
                <img
                  src={user.profilePicture || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />
                <div>
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-sm text-white opacity-90">{user.totalPoints} Points</p>
                </div>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {menuItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-6 py-3 text-textSecondary hover:bg-background hover:text-primary transition-colors ${
                    isActive ? 'bg-background text-primary border-r-2 border-primary' : ''
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </NavLink>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-2 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;