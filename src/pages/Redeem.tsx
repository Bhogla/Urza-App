import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Gift, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';

const Redeem: React.FC = () => {
  const { user, addTransaction } = useAuth();
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!user) return null;

  const availablePoints = user.totalPoints;
  const minWithdrawal = 500;
  const maxWithdrawal = Math.floor(availablePoints / 100) * 100;

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(withdrawalAmount);
    
    if (amount < minWithdrawal || amount > maxWithdrawal) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const transaction = {
      id: Date.now().toString(),
      type: 'withdrawal' as const,
      amount: amount,
      points: amount,
      description: 'UPI Withdrawal',
      status: 'pending' as const,
      date: new Date().toISOString().split('T')[0],
      upiId: upiId,
    };

    addTransaction(transaction);
    setIsSubmitting(false);
    setShowSuccess(true);
    setWithdrawalAmount('');
    setUpiId('');

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const quickAmounts = [500, 1000, 2000, 5000].filter(amount => amount <= maxWithdrawal);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Redeem Points</h1>
        <p className="text-gray-600">Convert your points to cash</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-yellow-500 to-green-500 rounded-2xl p-6 text-white text-center">
        <div className="mb-4">
          <Gift size={48} className="mx-auto mb-2 opacity-90" />
          <h2 className="text-3xl font-bold">{availablePoints}</h2>
          <p className="text-lg opacity-90">Available Points</p>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <p className="text-sm opacity-90">Cash Equivalent</p>
          <p className="text-2xl font-bold">₹{availablePoints}</p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="text-green-400 mr-3" size={20} />
            <div>
              <p className="font-medium text-green-800">Withdrawal Request Submitted!</p>
              <p className="text-sm text-green-600">Your request is being processed and will be credited within 24-48 hours.</p>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Withdraw to UPI</h3>
        
        {availablePoints < minWithdrawal ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="text-yellow-400 mr-3" size={20} />
              <div>
                <p className="font-medium text-yellow-800">Insufficient Points</p>
                <p className="text-sm text-yellow-600">
                  You need at least {minWithdrawal} points to make a withdrawal. 
                  Earn {minWithdrawal - availablePoints} more points to unlock withdrawals.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleWithdrawal} className="space-y-6">
            {/* UPI ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID *
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@paytm"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter your UPI ID (e.g., name@paytm, name@gpay)</p>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Withdrawal Amount (₹)
              </label>
              <input
                type="number"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                placeholder={`Min ₹${minWithdrawal}, Max ₹${maxWithdrawal}`}
                min={minWithdrawal}
                max={maxWithdrawal}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum withdrawal: ₹{minWithdrawal} | Available: ₹{maxWithdrawal}
              </p>
            </div>

            {/* Quick Amount Buttons */}
            {quickAmounts.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Select
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setWithdrawalAmount(amount.toString())}
                      className={`py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${
                        withdrawalAmount === amount.toString()
                          ? 'bg-yellow-500 text-white border-yellow-500'
                          : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                !upiId || 
                !withdrawalAmount || 
                parseInt(withdrawalAmount) < minWithdrawal || 
                parseInt(withdrawalAmount) > maxWithdrawal ||
                isSubmitting
              }
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Processing Withdrawal...' : `Withdraw ₹${withdrawalAmount || '0'}`}
            </button>
          </form>
        )}
      </div>

      {/* Terms */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Withdrawal Terms</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Minimum withdrawal amount is ₹{minWithdrawal}</li>
          <li>• Withdrawals are processed within 24-48 hours</li>
          <li>• Ensure your UPI ID is correct to avoid delays</li>
          <li>• No processing fees for withdrawals</li>
          <li>• Contact support if you face any issues</li>
        </ul>
      </div>
    </div>
  );
};

export default Redeem;