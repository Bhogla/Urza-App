import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  Gift,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Share2,
  UserPlus,
  Trophy
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, referrals } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const completedReferrals = referrals.filter(r => r.status === 'completed').length;
  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;
  const inProcessReferrals = referrals.filter(r => r.status === 'in_process').length;
  const earningsInINR = user.totalPoints;

  const recentReferrals = referrals.slice(0, 5);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'in_process':
        return <Clock className="text-yellow-500" size={16} />;
      default:
        return <AlertCircle className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_process':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Total Points Card */}
      <div className="card p-6 bg-gradient-to-r from-primary to-secondary text-white shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-80">Total Points</p>
            <h2 className="text-4xl font-bold">{user.totalPoints}</h2>
            <p className="text-lg opacity-90">₹{earningsInINR}</p>
          </div>
          <Trophy size={48} className="opacity-70" />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <button
            onClick={() => navigate('/add-referral')}
            className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-3 rounded-lg text-sm flex flex-col items-center transition-colors"
          >
            <UserPlus size={20} className="mb-1" />
            <span>Refer Now</span>
          </button>
          <button
            onClick={() => navigate('/referrals')}
            className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-3 rounded-lg text-sm flex flex-col items-center transition-colors"
          >
            <Users size={20} className="mb-1" />
            <span>My Referrals</span>
          </button>
          <button
            onClick={() => navigate('/transactions')}
            className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-3 rounded-lg text-sm flex flex-col items-center transition-colors"
          >
            <Clock size={20} className="mb-1" />
            <span>Transactions</span>
          </button>
        </div>
      </div>

      {/* How to Refer */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 mb-4">How to Refer & Earn</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Share Your Code</p>
              <p className="text-sm text-gray-600">Share your referral code: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{user.referralCode}</span></p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Customer Signs Up</p>
              <p className="text-sm text-gray-600">When they use your code to sign up</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-secondary/20 text-secondary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Earn Rewards</p>
              <p className="text-sm text-gray-600">Get 100 points (₹100) for each successful referral</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Recent Referrals</h2>
          <button
            onClick={() => navigate('/referrals')}
            className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        {recentReferrals.length > 0 ? (
          <div className="space-y-3">
            {recentReferrals.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{referral.customerName}</p>
                  <p className="text-sm text-gray-600">{referral.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                    {referral.status.replace('_', ' ').toUpperCase()}
                  </span>
                  {getStatusIcon(referral.status)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500 mb-2">No referrals yet</p>
            <button
              onClick={() => navigate('/add-referral')}
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Make your first referral
            </button>
          </div>
        )}
      </div>

      {/* Referral Code Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-1">Your Referral Code</h3>
            <p className="text-2xl font-mono font-bold text-blue-600">{user.referralCode}</p>
          </div>
          <button
            onClick={() => {
              navigator.share({
                title: 'Join Urza Rewards',
                text: `Use my referral code ${user.referralCode} to join Urza Rewards and start earning!`,
                url: `https://urzarewards.com/ref/${user.referralCode}`
              }).catch(() => {
                navigator.clipboard.writeText(`Use my referral code ${user.referralCode} to join Urza Rewards!`);
              });
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;