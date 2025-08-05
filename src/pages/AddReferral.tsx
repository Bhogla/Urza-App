import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, ArrowLeft, CheckCircle } from 'lucide-react';

const AddReferral: React.FC = () => {
  const { addReferral } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    location: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newReferral = {
      id: Date.now().toString(),
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      location: formData.location,
      status: 'pending' as const,
      points: 100,
      submittedDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
    };

    addReferral(newReferral);
    setIsSubmitting(false);
    setIsSuccess(true);

    // Redirect to referrals page after 2 seconds
    setTimeout(() => {
      navigate('/referrals');
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Referral Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your referral has been successfully submitted. You'll earn 100 points once it's completed.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 font-medium">
              Redirecting to your referrals...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add Referral</h1>
          <p className="text-gray-600">Submit a new customer referral</p>
        </div>
      </div>

      {/* Reward Info */}
      <div className="bg-gradient-to-r from-yellow-500 to-green-500 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Earn 100 Points!</h2>
        <p className="opacity-90">Submit a referral and earn ₹100 worth of points once it's completed.</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                placeholder="Enter customer's full name"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Customer Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                value={formData.customerPhone}
                onChange={(e) => handleInputChange('customerPhone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter 10-digit phone number"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Format: +91 will be added automatically</p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, State (e.g., Mumbai, Maharashtra)"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.customerName || !formData.customerPhone || !formData.location || formData.customerPhone.length !== 10 || isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Submitting Referral...' : 'Submit Referral'}
          </button>
        </form>
      </div>

      {/* How it Works */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">How Referrals Work</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="bg-yellow-100 text-yellow-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <div>
              <p className="font-medium text-gray-800">Submit Details</p>
              <p className="text-sm text-gray-600">Provide customer information</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <div>
              <p className="font-medium text-gray-800">We Process</p>
              <p className="text-sm text-gray-600">Our team contacts the customer</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <div>
              <p className="font-medium text-gray-800">Earn Rewards</p>
              <p className="text-sm text-gray-600">Get 100 points when completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReferral;