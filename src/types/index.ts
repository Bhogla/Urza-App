export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  profilePicture?: string;
  referralCode: string;
  totalPoints: number;
  joinedDate: string;
  isKYCVerified: boolean;
}

export interface Referral {
  id: string;
  customerName: string;
  customerPhone: string;
  location: string;
  status: 'pending' | 'in_process' | 'completed';
  points: number;
  submittedDate: string;
  updatedDate: string;
}

export interface Transaction {
  id: string;
  type: 'earned' | 'withdrawal';
  amount: number;
  points: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  upiId?: string;
}

export interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountHolderName: string;
  upiId: string;
}

export interface AppState {
  user: User | null;
  referrals: Referral[];
  transactions: Transaction[];
  isAuthenticated: boolean;
  loading: boolean;
}