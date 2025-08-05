import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit3,
  Camera,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Settings,
  Bell,
  HelpCircle
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  if (!user) return null;

  const handleSave = () => {
    updateUser(editForm);
    setIsEditing(false);
  };

  const profileSections = [
    {
      title: 'Account Settings',
      items: [
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: Shield, label: 'Privacy & Security', path: '/privacy' },
        { icon: Settings, label: 'App Settings', path: '/settings' },
      ]
    },
    {
      title: 'Help & Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', path: '/help' },
        { icon: Phone, label: 'Contact Support', path: '/contact' },
      ]
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-400 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-0 right-0 bg-white text-yellow-600 p-2 rounded-full shadow-lg">
              <Camera size={16} />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="opacity-90">{user.email}</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center space-x-1">
                {user.isKYCVerified ? (
                  <CheckCircle size={16} className="text-green-300" />
                ) : (
                  <AlertCircle size={16} className="text-yellow-300" />
                )}
                <span className="text-sm">
                  KYC {user.isKYCVerified ? 'Verified' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-yellow-600">{user.totalPoints}</div>
          <div className="text-sm text-gray-600">Total Points</div>
          <div className="text-xs text-green-600 font-medium">₹{user.totalPoints}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {Math.floor((Date.now() - new Date(user.joinedDate).getTime()) / (1000 * 60 * 60 * 24))}
          </div>
          <div className="text-sm text-gray-600">Days Active</div>
          <div className="text-xs text-gray-500">Since {new Date(user.joinedDate).toLocaleDateString()}</div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-yellow-600 hover:text-yellow-700 p-2 rounded-lg hover:bg-yellow-50 transition-colors"
          >
            <Edit3 size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="text-gray-400" size={20} />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800 font-medium">{user.name}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="text-gray-400" size={20} />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800 font-medium">{user.email}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="text-gray-400" size={20} />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <p className="text-gray-800 font-medium">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="text-gray-400" size={20} />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <p className="text-gray-800 font-medium">{user.district}, {user.state}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="text-gray-400" size={20} />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <p className="text-gray-800 font-medium">{new Date(user.joinedDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Referral Code */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-bold text-gray-800 mb-2">Your Referral Code</h3>
        <p className="text-2xl font-mono font-bold text-blue-600 mb-2">{user.referralCode}</p>
        <p className="text-sm text-gray-600">Share this code to earn rewards for every successful referral</p>
      </div>

      {/* Settings Sections */}
      {profileSections.map((section) => (
        <div key={section.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">{section.title}</h3>
          <div className="space-y-3">
            {section.items.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="text-gray-400" size={20} />
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <ArrowRight className="text-gray-400" size={16} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;