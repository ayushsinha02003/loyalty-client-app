import { useState, useEffect, useCallback } from 'react';
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
  const [dashboard, setDashboard] = useState<CustomerDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await customerApi.getDashboard();
      if (response.success) {
        const raw = response.data || response;
        const customerCards =
          raw.customerCards ||
          response.customerCards ||
          response.data?.customerCards ||
          [];
        const customer =
          raw.customer || response.customer || response.data?.customer || {};

        setDashboard({
          customer,
          customerCards,
        });
      } else {
        setError(response.message || 'Failed to load dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { dashboard, loading, error, refetch: fetchDashboard };
};

export const useCustomerCards = () => {
  const [cards, setCards] = useState<CustomerCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await customerApi.getDashboard();
      if (response.success) {
        const list =
          response.data?.customerCards ||
          response.customerCards ||
          (response as any).data?.cards ||
          (response as any).cards ||
          [];
        setCards(list);
      } else {
        setError(response.message || 'Failed to load cards');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load cards');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return { cards, loading, error, refetch: fetchCards };
};

export const useAvailableRewards = () => {
  const [rewards, setRewards] = useState<CustomerCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRewards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await customerApi.getAvailableRewards();
      if (response.success) {
        const list = response.data?.rewards || response.rewards || [];
        setRewards(list);
      } else {
        setError(response.message || 'Failed to load rewards');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load rewards');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRewards();
  }, [fetchRewards]);

  return { rewards, loading, error, refetch: fetchRewards };
};

export const useStampHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await customerApi.getStampHistory();
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

export const useRewardHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await customerApi.getRewardHistory();
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

export const useBusinessDashboard = () => {
  const [dashboard, setDashboard] = useState<BusinessDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await businessApi.getDashboard();
      if (response.success) {
        const data = (response as any).data?.dashboard || (response as any).dashboard || response.data;
        setDashboard(data);
      } else {
        setError(response.message || 'Failed to load dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { dashboard, loading, error, refetch: fetchDashboard };
};

export const useBusinessCustomers = () => {
  const [customers, setCustomers] = useState<BusinessCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await businessApi.getCustomers();
      if (response.success) {
        const list = response.data?.customers || response.customers || [];
        setCustomers(list);
      } else {
        setError(response.message || 'Failed to load customers');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, loading, error, refetch: fetchCustomers };
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
