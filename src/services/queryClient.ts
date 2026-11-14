import { QueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

export const QUERY_KEYS = {
  customerDashboard: ['customer', 'dashboard'] as const,
  customerCards: ['customer', 'cards'] as const,
  availableRewards: ['customer', 'rewards'] as const,
  stampHistory: ['customer', 'stampHistory'] as const,
  rewardHistory: ['customer', 'rewardHistory'] as const,
  businessDashboard: ['business', 'dashboard'] as const,
  businessCustomers: ['business', 'customers'] as const,
  businessRewards: ['business', 'rewards'] as const,
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 7, // Persist cache for 7 days
      staleTime: 1000 * 60 * 2, // Consider data fresh for 2 minutes
      retry: 2,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: '@loyaltyapp_query_cache_v1',
  throttleTime: 1000,
});

/**
 * Invalidates customer dashboard and card queries after stamp scan or reward claim.
 */
export async function invalidateCustomerQueries(): Promise<void> {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.customerDashboard }),
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.customerCards }),
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.availableRewards }),
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.stampHistory }),
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.rewardHistory }),
  ]);
}
