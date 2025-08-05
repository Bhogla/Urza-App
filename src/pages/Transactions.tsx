import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  TrendingUp,
  TrendingDown,
  Filter,
  Calendar,
  CreditCard,
  Gift,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const Transactions: React.FC = () => {
  const { transactions, user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'earned' | 'withdrawal'>('all');

  const filteredTransactions = transactions.filter(transaction => 
    filter === 'all' || transaction.type === filter
  );

  const totalEarned = transactions
    .filter(t => t.type === 'earned' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawn = transactions
    .filter(t => t.type === 'withdrawal' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const getTransactionIcon = (type: string) => {
    return type === 'earned' ? (
      <div className="bg-green-100 p-2 rounded-lg">
        <ArrowDownLeft className="text-green-600" size={20} />
      </div>
    ) : (
      <div className="bg-red-100 p-2 rounded-lg">
        <ArrowUpRight className="text-red-600" size={20} />
      </div>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={16} />;
      case 'failed':
        return <AlertCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <p className="text-gray-600">Track your earnings and withdrawals</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Gift className="text-yellow-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">{user?.totalPoints || 0}</span>
          </div>
          <p className="text-sm text-gray-600">Available Points</p>
          <p className="text-xs text-green-600 font-medium">₹{user?.totalPoints || 0}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-green-600">₹{totalEarned}</span>
          </div>
          <p className="text-sm text-gray-600">Total Earned</p>
          <p className="text-xs text-gray-500">{totalEarned} points</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-red-100 p-2 rounded-lg">
              <TrendingDown className="text-red-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-red-600">₹{totalWithdrawn}</span>
          </div>
          <p className="text-sm text-gray-600">Total Withdrawn</p>
          <p className="text-xs text-gray-500">{totalWithdrawn} points</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <Filter className="text-gray-400 flex-shrink-0" size={20} />
          {[
            { key: 'all', label: 'All Transactions' },
            { key: 'earned', label: 'Earnings' },
            { key: 'withdrawal', label: 'Withdrawals' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === key
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                {getTransactionIcon(transaction.type)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate flex-1 min-w-0">{transaction.description}</h3>
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className={`text-lg font-bold whitespace-nowrap ${
                        transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'earned' ? '+' : '-'}₹{transaction.amount}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.type === 'earned' ? '+' : '-'}{transaction.points} pts
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 min-w-0 flex-grow flex-shrink">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600 truncate">
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                      {transaction.upiId && (
                        <>
                          <span className="text-gray-300">•</span>
                          <CreditCard size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-600 truncate">{transaction.upiId}</span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status.toUpperCase()}
                      </span>
                      {getStatusIcon(transaction.status)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <CreditCard className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No transactions found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'Your transaction history will appear here' 
                : `No ${filter} transactions found`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;