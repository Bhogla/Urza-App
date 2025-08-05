import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import Referrals from './pages/Referrals';
import AddReferral from './pages/AddReferral';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';
import Redeem from './pages/Redeem';

// Import Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="referrals" element={<Referrals />} />
          <Route path="add-referral" element={<AddReferral />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="redeem" element={<Redeem />} />
          <Route path="profile" element={<Profile />} />
          {/* Placeholder routes for side menu items */}
          <Route path="leaderboard" element={<div className="p-4 text-center">Leaderboard - Coming Soon</div>} />
          <Route path="bank-details" element={<div className="p-4 text-center">Bank Details - Coming Soon</div>} />
          <Route path="kyc" element={<div className="p-4 text-center">KYC - Coming Soon</div>} />
          <Route path="calculator" element={<div className="p-4 text-center">Savings Calculator - Coming Soon</div>} />
          <Route path="announcements" element={<div className="p-4 text-center">Announcements - Coming Soon</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="font-sans">
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default App;