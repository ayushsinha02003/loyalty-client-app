import {
  API_BASE_URL,
  getAuthToken,
  setAuthToken,
  clearAuthData,
  loginUser,
  registerUser,
} from './authService';

export { setAuthToken };
export const clearAuthToken = clearAuthData;

// Types
export interface Business {
  _id: string;
  owner?: string;
  businessName: string;
  category: string;
  description?: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state?: string;
  country?: string;
  postalCode?: string;
  logo?: string;
  website?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoyaltyCard {
  _id: string;
  business: string | Business;
  title: string;
  description?: string;
  totalStamps: number;
  reward: string;
  icon?: string;
  backgroundColor?: string;
  textColor?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerCard {
  _id: string;
  customer: any;
  loyaltyCard: LoyaltyCard;
  currentStamps: number;
  isRewardAvailable: boolean;
  joinedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StampTransaction {
  _id: string;
  customerCard: string | CustomerCard;
  business: string | Business;
  addedBy: any;
  stampsAdded: number;
  createdAt: string;
}

export interface RewardTransaction {
  _id: string;
  customerCard: string | CustomerCard;
  business: string | Business;
  customer: any;
  loyaltyCard: string | LoyaltyCard;
  reward: string;
  redeemedBy: any;
  createdAt: string;
}

export interface QRCode {
  _id: string;
  business: string | Business;
  loyaltyCard: string | LoyaltyCard;
  code: string;
  qrImage?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BusinessDashboard {
  business: Business;
  totalLoyaltyCards: number;
  totalCustomers: number;
  totalStamps: number;
  totalRewardsRedeemed: number;
  rewardsAvailable: number;
}

export interface BusinessCustomer {
  _id: string;
  customer: { _id: string; name: string; phone: string; email: string };
  loyaltyCard: { _id: string; title: string; totalStamps: number; reward: string; isActive?: boolean };
  currentStamps: number;
  isRewardAvailable: boolean;
  createdAt?: string;
}

export interface CustomerDashboard {
  customer: { _id: string; name: string; phone: string; email: string; role: string };
  customerCards: CustomerCard[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

// Base fetch with auth
async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const response = await fetch(`${API_BASE_URL}${normalizedEndpoint}`, {
    ...options,
    headers,
  });

  let data: any;
  try {
    data = await response.json();
  } catch {
    throw new Error('Server returned an invalid response');
  }

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

// ============ AUTH API ============
export const authApi = {
  login: async (phone: string, password: string) => {
    return loginUser({ phone, password });
  },

  register: async (data: {
    name: string;
    phone: string;
    password: string;
    email?: string;
    role: 'customer' | 'business';
    businessName?: string;
    category?: string;
    address?: string;
    city?: string;
  }) => {
    return registerUser(data);
  },

  getProfile: async () => {
    return fetchWithAuth('/api/auth/profile');
  },
};

// ============ BUSINESS API ============
export const businessApi = {
  create: async (data: Partial<Business>) => {
    return fetchWithAuth<Business>('/api/business', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  get: async () => {
    return fetchWithAuth<Business>('/api/business');
  },

  update: async (data: Partial<Business>) => {
    return fetchWithAuth<Business>('/api/business', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async () => {
    return fetchWithAuth('/api/business', {
      method: 'DELETE',
    });
  },

  getDashboard: async () => {
    return fetchWithAuth<BusinessDashboard>('/api/business/dashboard');
  },

  getCustomers: async () => {
    return fetchWithAuth<{ customers: BusinessCustomer[] }>('/api/business/customers');
  },

  getCustomerDetails: async (customerCardId: string) => {
    return fetchWithAuth<{
      customerCard: CustomerCard;
      stampHistory: StampTransaction[];
      rewardHistory: RewardTransaction[];
    }>(`/api/business/customers/${customerCardId}`);
  },
};

// ============ LOYALTY CARD API ============
export const loyaltyCardApi = {
  create: async (data: Partial<LoyaltyCard>) => {
    return fetchWithAuth<LoyaltyCard>('/api/cards', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAll: async () => {
    return fetchWithAuth<{ loyaltyCards: LoyaltyCard[] }>('/api/cards');
  },

  getById: async (id: string) => {
    return fetchWithAuth<LoyaltyCard>(`/api/cards/${id}`);
  },

  update: async (id: string, data: Partial<LoyaltyCard>) => {
    return fetchWithAuth<LoyaltyCard>(`/api/cards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return fetchWithAuth(`/api/cards/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============ CUSTOMER CARD API ============
export const customerCardApi = {
  join: async (cardId: string) => {
    return fetchWithAuth<CustomerCard>('/api/customer-cards/join', {
      method: 'POST',
      body: JSON.stringify({ cardId }),
    });
  },

  getMyCards: async () => {
    return fetchWithAuth<{ cards: CustomerCard[] }>('/api/customer-cards');
  },
};

// ============ STAMP API ============
export const stampApi = {
  addStamp: async (customerCardId: string) => {
    return fetchWithAuth<{ customerCard: CustomerCard }>('/api/stamps/add', {
      method: 'POST',
      body: JSON.stringify({ customerCardId }),
    });
  },

  addStampByCard: async (customerCardId: string) => {
    return fetchWithAuth<{ customerCard: CustomerCard; transaction: StampTransaction }>('/api/stamps/customer', {
      method: 'POST',
      body: JSON.stringify({ customerCardId }),
    });
  },

  getHistory: async () => {
    return fetchWithAuth<{ history: StampTransaction[] }>('/api/stamps/history');
  },
};

// ============ REWARD API ============
export const rewardApi = {
  redeem: async (customerCardId: string) => {
    return fetchWithAuth<{ rewardTransaction: RewardTransaction; customerCard: CustomerCard }>('/api/rewards/redeem', {
      method: 'POST',
      body: JSON.stringify({ customerCardId }),
    });
  },

  getHistory: async () => {
    return fetchWithAuth<{ history: RewardTransaction[] }>('/api/rewards/history');
  },
};

// ============ QR CODE API ============
export const qrApi = {
  create: async (loyaltyCardId: string) => {
    return fetchWithAuth<QRCode>('/api/qr', {
      method: 'POST',
      body: JSON.stringify({ loyaltyCardId }),
    });
  },

  scan: async (code: string) => {
    return fetchWithAuth<{ customerCard: CustomerCard; stampsEarned?: number }>('/api/qr/scan', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },

  getDetails: async (code: string) => {
    return fetchWithAuth<{ qrCode: QRCode }>(`/api/qr/${code}`);
  },

  getMyQRCodes: async () => {
    return fetchWithAuth<{ qrCodes: QRCode[] }>('/api/qr');
  },

  deactivate: async (id: string) => {
    return fetchWithAuth<QRCode>(`/api/qr/${id}`, {
      method: 'DELETE',
    });
  },

  findCustomerByQR: async (customerCardId: string) => {
    return fetchWithAuth<{ customerCard: CustomerCard }>('/api/qr/find-customer', {
      method: 'POST',
      body: JSON.stringify({ customerCardId }),
    });
  },
};

// ============ CUSTOMER API ============
export const customerApi = {
  getProfile: async () => {
    return fetchWithAuth('/api/customer/profile');
  },

  getDashboard: async () => {
    return fetchWithAuth<CustomerDashboard>('/api/customer/dashboard');
  },

  getStampHistory: async () => {
    return fetchWithAuth<{ history: StampTransaction[] }>('/api/customer/stamp-history');
  },

  getRewardHistory: async () => {
    return fetchWithAuth<{ history: RewardTransaction[] }>('/api/customer/reward-history');
  },

  getCardDetails: async (customerCardId: string) => {
    return fetchWithAuth<{ customerCard: CustomerCard }>(`/api/customer/cards/${customerCardId}`);
  },

  getAvailableRewards: async () => {
    return fetchWithAuth<{ rewards: CustomerCard[] }>('/api/customer/rewards');
  },
};
