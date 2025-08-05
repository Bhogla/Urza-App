import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import SideMenu from './SideMenu';
import { Menu } from 'lucide-react';
import UrzaLogo from '../../assets/urza_logo.svg';

const MainLayout: React.FC = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 gradient-primary">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <button
            onClick={() => setIsSideMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          <div className="flex items-center space-x-2">
            <img src={UrzaLogo} alt="Urza App Logo" className="h-10" />
            
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 min-h-screen">
        <div className="max-w-md mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Side Menu */}
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
    </div>
  );
};

export default MainLayout;