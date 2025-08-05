import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Phone, Lock, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const { login, setLoading, loading } = useAuth();
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
  });
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [showOtp, setShowOtp] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length === 10) {
      setLoading(true);
      // Simulate OTP sending
      setTimeout(() => {
        setLoading(false);
        setStep('otp');
      }, 1500);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otp.length === 6) {
      setLoading(true);
      // Simulate login
      setTimeout(() => {
        const mockUser = {
          id: '1',
          name: 'Rajesh Kumar',
          email: 'rajesh@example.com',
          phone: `+91 ${formData.phone}`,
          state: 'Karnataka',
          district: 'Bangalore',
          profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          referralCode: 'URZA-RK-2024',
          totalPoints: 1250,
          joinedDate: '2024-01-15',
          isKYCVerified: true,
        };
        login(mockUser);
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-logo flex items-center justify-center mx-auto mb-4 shadow-lg bg-logo-login"></div>
          <h1 className="text-3xl font-bold text-white mb-2">Urza Rewards</h1>
          <p className="text-white/90">Start earning rewards today!</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Welcome Back</h2>
                <p className="text-gray-600 text-center">Enter your phone number to continue</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    placeholder="Enter 10-digit phone number"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={formData.phone.length !== 10 || loading}
                className="w-full btn-primary"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Verify OTP</h2>
                <p className="text-gray-600 text-center">
                  We've sent a 6-digit code to +91 {formData.phone}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showOtp ? 'text' : 'password'}
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOtp(!showOtp)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showOtp ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={formData.otp.length !== 6 || loading}
                  className="flex-1 btn-primary"
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                  Didn't receive OTP? Resend
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-white text-sm text-center mb-2">Demo Credentials:</p>
          <p className="text-white/90 text-xs text-center">Phone: Any 10-digit number | OTP: Any 6-digit code</p>
        </div>
      </div>
    </div>
  );
};

export default Login;