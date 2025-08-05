import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Referral, Transaction, AppState } from '../types';

interface AuthContextType extends AppState {
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  addReferral: (referral: Referral) => void;
  updateReferralStatus: (id: string, status: Referral['status']) => void;
  addTransaction: (transaction: Transaction) => void;
  setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'ADD_REFERRAL'; payload: Referral }
  | { type: 'UPDATE_REFERRAL_STATUS'; payload: { id: string; status: Referral['status'] } }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  user: null,
  referrals: [],
  transactions: [],
  isAuthenticated: false,
  loading: false,
};

// Mock data for demonstration
const mockUser: User = {
  id: '1',
  name: 'Rajesh Kumar',
  email: 'rajesh@example.com',
  phone: '+91 9876543210',
  state: 'Karnataka',
  district: 'Bangalore',
  profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  referralCode: 'URZA-RK-2024',
  totalPoints: 1250,
  joinedDate: '2024-01-15',
  isKYCVerified: true,
};

const mockReferrals: Referral[] = [
  {
    id: '1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 9876543211',
    location: 'Mumbai, Maharashtra',
    status: 'completed',
    points: 100,
    submittedDate: '2024-01-20',
    updatedDate: '2024-01-25',
  },
  {
    id: '2',
    customerName: 'Amit Singh',
    customerPhone: '+91 9876543212',
    location: 'Delhi, NCR',
    status: 'in_process',
    points: 100,
    submittedDate: '2024-01-22',
    updatedDate: '2024-01-24',
  },
  {
    id: '3',
    customerName: 'Sunita Patel',
    customerPhone: '+91 9876543213',
    location: 'Ahmedabad, Gujarat',
    status: 'pending',
    points: 100,
    submittedDate: '2024-01-25',
    updatedDate: '2024-01-25',
  },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'earned',
    amount: 100,
    points: 100,
    description: 'Referral: Priya Sharma',
    status: 'completed',
    date: '2024-01-25',
  },
  {
    id: '2',
    type: 'withdrawal',
    amount: 500,
    points: 500,
    description: 'UPI Withdrawal',
    status: 'completed',
    date: '2024-01-20',
    upiId: 'rajesh@paytm',
  },
];

function authReducer(state: AppState, action: AuthAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        referrals: mockReferrals,
        transactions: mockTransactions,
      };
    case 'LOGOUT':
      return initialState;
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'ADD_REFERRAL':
      return {
        ...state,
        referrals: [action.payload, ...state.referrals],
      };
    case 'UPDATE_REFERRAL_STATUS':
      return {
        ...state,
        referrals: state.referrals.map(referral =>
          referral.id === action.payload.id
            ? { ...referral, status: action.payload.status, updatedDate: new Date().toISOString().split('T')[0] }
            : referral
        ),
        user: action.payload.status === 'completed' && state.user
          ? { ...state.user, totalPoints: state.user.totalPoints + 100 }
          : state.user,
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user: User) => {
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (user: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const addReferral = (referral: Referral) => {
    dispatch({ type: 'ADD_REFERRAL', payload: referral });
  };

  const updateReferralStatus = (id: string, status: Referral['status']) => {
    dispatch({ type: 'UPDATE_REFERRAL_STATUS', payload: { id, status } });
  };

  const addTransaction = (transaction: Transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateUser,
        addReferral,
        updateReferralStatus,
        addTransaction,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};