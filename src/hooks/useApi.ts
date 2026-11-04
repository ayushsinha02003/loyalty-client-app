import { useState, useEffect } from 'react';
import { customerApi, CustomerDashboard, CustomerCard } from '../../services/api';

export const useCustomerDashboard = () => {
  const [dashboard, setDashboard] = useState<CustomerDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await customerApi.getDashboard();
      if (response.success) {
        setDashboard(response.data || null);
      } else {
        setError(response.message || 'Failed to load dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const refetch = () => fetchDashboard();

  return { dashboard, loading, error, refetch };
};

export const useCustomerCards = () => {
  const [cards, setCards] = useState<CustomerCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await customerApi.getDashboard();
      if (response.success && response.data?.customerCards) {
        setCards(response.data.customerCards);
      } else {
        setError(response.message || 'Failed to load cards');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load cards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const refetch = () => fetchCards();

  return { cards, loading, error, refetch };
};

export const useAvailableRewards = () => {
  const [rewards, setRewards] = useState<CustomerCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const response = await customerApi.getAvailableRewards();
      if (response.success && response.data?.rewards) {
        setRewards(response.data.rewards);
      } else {
        setError(response.message || 'Failed to load rewards');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load rewards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const refetch = () => fetchRewards();

  return { rewards, loading, error, refetch };
};

export const useStampHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await customerApi.getStampHistory();
      if (response.success && response.data?.history) {
        setHistory(response.data.history);
      } else {
        setError(response.message || 'Failed to load stamp history');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load stamp history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const refetch = () => fetchHistory();

  return { history, loading, error, refetch };
};

export const useRewardHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await customerApi.getRewardHistory();
      if (response.success && response.data?.history) {
        setHistory(response.data.history);
      } else {
        setError(response.message || 'Failed to load reward history');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load reward history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const refetch = () => fetchHistory();

  return { history, loading, error, refetch };
};

export const useBusinessDashboard = () => {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await import('../../services/api').then(m => m.businessApi.getDashboard());
      if (response.success && response.data) {
        setDashboard(response.data);
      } else {
        setError(response.message || 'Failed to load dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const refetch = () => fetchDashboard();

  return { dashboard, loading, error, refetch };
};

export const useBusinessCustomers = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await import('../../services/api').then(m => m.businessApi.getCustomers());
      if (response.success && response.data?.customers) {
        setCustomers(response.data.customers);
      } else {
        setError(response.message || 'Failed to load customers');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const refetch = () => fetchCustomers();

  return { customers, loading, error, refetch };
};

export const useBusinessLoyaltyCards = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await import('../../services/api').then(m => m.loyaltyCardApi.getAll());
      if (response.success && response.data?.loyaltyCards) {
        setCards(response.data.loyaltyCards);
      } else {
        setError(response.message || 'Failed to load loyalty cards');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load loyalty cards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const refetch = () => fetchCards();

  return { cards, loading, error, refetch };
};