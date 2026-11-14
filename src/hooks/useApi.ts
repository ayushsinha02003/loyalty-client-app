import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../services/queryClient';
import {
  customerApi,
  businessApi,
  loyaltyCardApi,
  stampApi,
  rewardApi,
  qrApi,
  CustomerDashboard,
  CustomerCard,
  LoyaltyCard,
  BusinessDashboard,
  BusinessCustomer,
  Business,
  QRCode,
} from '../services/api';

export const useCustomerDashboard = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.customerDashboard,
    queryFn: async () => {
      const response = await customerApi.getDashboard();
      if (!response.success) {
        throw new Error(response.message || 'Failed to load dashboard');
      }
      const raw = response.data || response;
      const customerCards: CustomerCard[] =
        raw.customerCards ||
        response.customerCards ||
        response.data?.customerCards ||
        [];
      const customer =
        raw.customer || response.customer || response.data?.customer || {};

      const dashboardData: CustomerDashboard = { customer, customerCards };
      return dashboardData;
    },
  });

  const refetch = useCallback(() => {
    query.refetch();
  }, [query]);

  return {
    dashboard: query.data || null,
    loading: query.isLoading && !query.data,
    isFetching: query.isFetching,
    error: query.error ? (query.error as Error).message : null,
    refetch,
  };
};

export const useCustomerCards = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.customerCards,
    queryFn: async () => {
      const response = await customerApi.getDashboard();
      if (!response.success) {
        throw new Error(response.message || 'Failed to load cards');
      }
      const list: CustomerCard[] =
        response.data?.customerCards ||
        response.customerCards ||
        (response as any).data?.cards ||
        (response as any).cards ||
        [];
      return list;
    },
  });

  const refetch = useCallback(() => {
    query.refetch();
  }, [query]);

  return {
    cards: query.data || [],
    loading: query.isLoading && !query.data,
    isFetching: query.isFetching,
    error: query.error ? (query.error as Error).message : null,
    refetch,
  };
};

export const useAvailableRewards = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.availableRewards,
    queryFn: async () => {
      const response = await customerApi.getAvailableRewards();
      if (!response.success) {
        throw new Error(response.message || 'Failed to load rewards');
      }
      const list: CustomerCard[] =
        response.data?.rewards || response.rewards || [];
      return list;
    },
  });

  const refetch = useCallback(() => {
    query.refetch();
  }, [query]);

  return {
    rewards: query.data || [],
    loading: query.isLoading && !query.data,
    isFetching: query.isFetching,
    error: query.error ? (query.error as Error).message : null,
    refetch,
  };
};

export const useStampHistory = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.stampHistory,
    queryFn: async () => {
      const response = await customerApi.getStampHistory();
      if (!response.success) {
        throw new Error(response.message || 'Failed to load stamp history');
      }
      const list: any[] = response.data?.history || response.history || [];
      return list;
    },
  });

  const refetch = useCallback(() => {
    query.refetch();
  }, [query]);

  return {
    history: query.data || [],
    loading: query.isLoading && !query.data,
    isFetching: query.isFetching,
    error: query.error ? (query.error as Error).message : null,
    refetch,
  };
};

export const useRewardHistory = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.rewardHistory,
    queryFn: async () => {
      const response = await customerApi.getRewardHistory();
      if (!response.success) {
        throw new Error(response.message || 'Failed to load reward history');
      }
      const list: any[] = response.data?.history || response.history || [];
      return list;
    },
  });

  const refetch = useCallback(() => {
    query.refetch();
  }, [query]);

  return {
    history: query.data || [],
    loading: query.isLoading && !query.data,
    isFetching: query.isFetching,
    error: query.error ? (query.error as Error).message : null,
    refetch,
  };
};

export const useBusinessDashboard = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.businessDashboard,
    queryFn: async () => {
      const response = await businessApi.getDashboard();
      if (!response.success) {
        throw new Error(response.message || 'Failed to load dashboard');
      }
      const data: BusinessDashboard =
        (response as any).data?.dashboard ||
        (response as any).dashboard ||
        response.data;
      return data;
    },
  });

  const refetch = useCallback(() => {
    query.refetch();
  }, [query]);

  return {
    dashboard: query.data || null,
    loading: query.isLoading && !query.data,
    isFetching: query.isFetching,
    error: query.error ? (query.error as Error).message : null,
    refetch,
  };
};

export const useBusinessCustomers = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.businessCustomers,
    queryFn: async () => {
      const response = await businessApi.getCustomers();
      if (!response.success) {
        throw new Error(response.message || 'Failed to load customers');
      }
      const list: BusinessCustomer[] =
        response.data?.customers || response.customers || [];
      return list;
    },
  });

  const refetch = useCallback(() => {
    query.refetch();
  }, [query]);

  return {
    customers: query.data || [],
    loading: query.isLoading && !query.data,
    isFetching: query.isFetching,
    error: query.error ? (query.error as Error).message : null,
    refetch,
  };
};

export const useBusinessLoyaltyCards = () => {
  const [cards, setCards] = useState<LoyaltyCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await loyaltyCardApi.getAll();
      if (response.success) {
        const list = response.data?.loyaltyCards || response.loyaltyCards || [];
        setCards(list);
      } else {
        setError(response.message || 'Failed to load loyalty cards');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load loyalty cards');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCard = async (data: Partial<LoyaltyCard>) => {
    const response = await loyaltyCardApi.create(data);
    if (response.success) {
      const created = response.data || (response as any).loyaltyCard;
      if (created) {
        setCards(prev => [created, ...prev]);
      }
      fetchCards();
      return created;
    }
    throw new Error(response.message || 'Failed to create card');
  };

  const updateCard = async (id: string, data: Partial<LoyaltyCard>) => {
    const response = await loyaltyCardApi.update(id, data);
    if (response.success) {
      const updated = response.data || (response as any).loyaltyCard;
      if (updated) {
        setCards(prev => prev.map(c => (c._id === id ? updated : c)));
      }
      return updated;
    }
    throw new Error(response.message || 'Failed to update card');
  };

  const deleteCard = async (id: string) => {
    const response = await loyaltyCardApi.delete(id);
    if (response.success) {
      setCards(prev => prev.filter(c => c._id !== id));
      return true;
    }
    throw new Error(response.message || 'Failed to delete card');
  };

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return { cards, loading, error, refetch: fetchCards, createCard, updateCard, deleteCard };
};

export const useBusinessStampHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await stampApi.getHistory();
      if (response.success) {
        const list = response.data?.history || response.history || [];
        setHistory(list);
      } else {
        setError(response.message || 'Failed to load stamp history');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load stamp history');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, error, refetch: fetchHistory };
};

export const useBusinessRewardHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await rewardApi.getHistory();
      if (response.success) {
        const list = response.data?.history || response.history || [];
        setHistory(list);
      } else {
        setError(response.message || 'Failed to load reward history');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load reward history');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, error, refetch: fetchHistory };
};

export const useBusinessProfile = () => {
  const [profile, setProfile] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await businessApi.get();
      if (response.success) {
        const data = (response as any).data?.business || (response as any).business || response.data;
        setProfile(data);
      } else {
        setError(response.message || 'Failed to load business profile');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load business profile');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (data: Partial<Business>) => {
    const response = await businessApi.update(data);
    if (response.success) {
      const updated = (response as any).data?.business || (response as any).business || response.data;
      setProfile(updated);
      return updated;
    }
    throw new Error(response.message || 'Failed to update profile');
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile, updateProfile };
};

export const useBusinessQRCodes = () => {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQRCodes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await qrApi.getMyQRCodes();
      if (response.success) {
        const list = response.data?.qrCodes || response.qrCodes || [];
        setQrCodes(list);
      } else {
        setError(response.message || 'Failed to load QR codes');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load QR codes');
    } finally {
      setLoading(false);
    }
  }, []);

  const createQRCode = async (loyaltyCardId: string) => {
    const response = await qrApi.create(loyaltyCardId);
    if (response.success) {
      const created = response.data || (response as any).qrCode;
      if (created) {
        setQrCodes(prev => [created, ...prev]);
      }
      fetchQRCodes();
      return created;
    }
    throw new Error(response.message || 'Failed to create QR code');
  };

  const deactivateQRCode = async (id: string) => {
    const response = await qrApi.deactivate(id);
    if (response.success) {
      fetchQRCodes();
      return true;
    }
    throw new Error(response.message || 'Failed to deactivate QR code');
  };

  useEffect(() => {
    fetchQRCodes();
  }, [fetchQRCodes]);

  return { qrCodes, loading, error, refetch: fetchQRCodes, createQRCode, deactivateQRCode };
};

// Hook for customer to discover & explore loyalty cards
export const useExploreCards = () => {
  const [cards, setCards] = useState<LoyaltyCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExploreCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await loyaltyCardApi.getAll();
      if (response.success) {
        const list = response.data?.loyaltyCards || response.loyaltyCards || [];
        setCards(list);
      } else {
        setError(response.message || 'Failed to load available cards');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load available cards');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExploreCards();
  }, [fetchExploreCards]);

  return { cards, loading, error, refetch: fetchExploreCards };
};
