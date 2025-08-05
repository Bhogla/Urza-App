import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Filter,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Calendar,
  MapPin,
  Phone
} from 'lucide-react';
import { Referral } from '../types';

const Referrals: React.FC = () => {
  const { referrals } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in_process' | 'completed'>('all');

  const filteredReferrals = referrals.filter((referral) => {
    const matchesSearch = referral.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.customerPhone.includes(searchTerm) ||
                         referral.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || referral.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'in_process':
        return <Clock className="text-yellow-500" size={20} />;
      default:
        return <AlertCircle className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_process':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const statusCounts = {
    all: referrals.length,
    pending: referrals.filter(r => r.status === 'pending').length,
    in_process: referrals.filter(r => r.status === 'in_process').length,
    completed: referrals.filter(r => r.status === 'completed').length,
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Referrals</h1>
          <p className="text-gray-600">Track your referral progress</p>
        </div>
        <button
          onClick={() => navigate('/add-referral')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg shadow-lg transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{statusCounts.all}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.in_process}</div>
            <div className="text-sm text-gray-600">In Process</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, phone, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('_', ' ').toUpperCase()} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Referrals List */}
      <div className="space-y-3">
        {filteredReferrals.length > 0 ? (
          filteredReferrals.map((referral) => (
            <div key={referral.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{referral.customerName}</h3>
                    {getStatusIcon(referral.status)}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                    <Phone size={14} />
                    <span>{referral.customerPhone}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>{referral.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(referral.status)}`}>
                    {referral.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <div className="mt-2 text-sm text-gray-600">
                    {referral.status === 'completed' ? (
                      <span className="text-green-600 font-medium">+{referral.points} pts</span>
                    ) : (
                      <span className="text-gray-500">{referral.points} pts</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>Submitted: {new Date(referral.submittedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={12} />
                  <span>Updated: {new Date(referral.updatedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <Users className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No matching referrals' : 'No referrals yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Start referring customers to earn rewards!'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button
                onClick={() => navigate('/add-referral')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Add Your First Referral
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Referrals;