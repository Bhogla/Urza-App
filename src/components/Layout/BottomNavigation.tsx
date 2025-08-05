import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Plus, CreditCard, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/referrals', icon: Users, label: 'Referrals' },
    { path: '/add-referral', icon: Plus, label: 'Add', isMain: true },
    { path: '/transactions', icon: CreditCard, label: 'Transactions' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map(({ path, icon: Icon, label, isMain }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isMain
                  ? 'bg-accent text-white shadow-medium transform -translate-y-2 w-14 h-14 rounded-full flex items-center justify-center'
                  : isActive
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            <Icon size={isMain ? 24 : 20} className={isMain ? 'mb-0' : 'mb-1'} />
            {!isMain && <span className="text-xs font-medium">{label}</span>}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;