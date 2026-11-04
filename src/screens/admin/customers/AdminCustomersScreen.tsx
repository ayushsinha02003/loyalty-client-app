import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useBusinessCustomers } from '../../../hooks/useApi';
import PrimaryText from '../../../components/text/PrimaryText';
import { stampApi, rewardApi } from '../../../services/api';
import { AdminCustomersScreenSkeleton } from '../../../components/skeleton';

interface AdminCustomersScreenProps {
  onOpenScanner?: () => void;
}

export default function AdminCustomersScreen({ onOpenScanner }: AdminCustomersScreenProps = {}) {
  const [search, setSearch] = useState('');
  const { customers, loading, error, refetch } = useBusinessCustomers();
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  if (loading && (!customers || customers.length === 0)) {
    return <AdminCustomersScreenSkeleton />;
  }

  const filtered = customers?.filter(
    (c: any) =>
      c.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.customer?.phone?.includes(search) ||
      c.loyaltyCard?.title?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleAddStamp = async (customerCardId: string, customerName: string) => {
    setActionLoadingId(customerCardId);
    try {
      const response = await stampApi.addStampByCard(customerCardId);
      if (response.success) {
        Alert.alert('Stamp Added', `Successfully added 1 stamp to ${customerName}!`);
        refetch();
      } else {
        Alert.alert('Error', response.message || 'Failed to add stamp');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to add stamp');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRedeemReward = async (customerCardId: string, customerName: string) => {
    setActionLoadingId(customerCardId);
    try {
      const response = await rewardApi.redeem(customerCardId);
      if (response.success) {
        Alert.alert('Reward Redeemed', `Reward successfully redeemed for ${customerName}!`);
        refetch();
      } else {
        Alert.alert('Error', response.message || 'Failed to redeem reward');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to redeem reward');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <PrimaryText text="Customers" customStyle={styles.title} />
        {onOpenScanner && (
          <TouchableOpacity
            style={styles.scanHeaderButton}
            onPress={onOpenScanner}
            activeOpacity={0.8}
          >
            <Text style={styles.scanHeaderButtonText}>📷 Scan QR</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Search Bar Row */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or phone..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Customers List */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7B3FF2" />
            <Text style={styles.loadingText}>Loading customers...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filtered.length > 0 ? (
          filtered.map((customerCard: any) => {
            const customer = customerCard.customer || {};
            const card = customerCard.loyaltyCard || {};
            const isRewardReady = customerCard.isRewardAvailable;
            const isProcessing = actionLoadingId === customerCard._id;

            return (
              <View key={customerCard._id} style={styles.customerCard}>
                <View style={styles.customerRow}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarInitial}>
                      {customer.name?.charAt(0) || '👤'}
                    </Text>
                  </View>

                  <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{customer.name || 'Customer'}</Text>
                    <Text style={styles.customerPhone}>{customer.phone || 'No phone'}</Text>
                    <Text style={styles.cardTitle}>{card.title || 'Loyalty Card'}</Text>
                  </View>

                  <View style={styles.stampBadge}>
                    <Text style={styles.stampValue}>
                      {customerCard.currentStamps || 0}/{card.totalStamps || 10}
                    </Text>
                    <Text style={styles.stampLabel}>Stamps</Text>
                  </View>
                </View>

                {/* Actions row: Add Stamp & Redeem Reward */}
                <View style={styles.actionRow}>
                  {isRewardReady ? (
                    <TouchableOpacity
                      style={styles.redeemButton}
                      onPress={() => handleRedeemReward(customerCard._id, customer.name || 'Customer')}
                      disabled={isProcessing}
                    >
                      <Text style={styles.redeemButtonText}>
                        {isProcessing ? 'Processing...' : '🎁 Redeem Reward'}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.addStampButton}
                      onPress={() => handleAddStamp(customerCard._id, customer.name || 'Customer')}
                      disabled={isProcessing}
                    >
                      <Text style={styles.addStampButtonText}>
                        {isProcessing ? 'Adding...' : '+ Add Stamp'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>👥</Text>
            <Text style={styles.emptyTitle}>No Customers Yet</Text>
            <Text style={styles.emptySubtitle}>
              {search
                ? 'No customers match your search.'
                : 'Customers who join your loyalty program will appear here.'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scanHeaderButton: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  scanHeaderButtonText: {
    color: '#7B3FF2',
    fontWeight: '700',
    fontSize: 13,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  searchRow: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    height: 48,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    paddingVertical: 0,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 12,
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4F46E5',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  customerPhone: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 12,
    color: '#7B3FF2',
    fontWeight: '600',
  },
  stampBadge: {
    alignItems: 'flex-end',
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  stampLabel: {
    fontSize: 11,
    color: '#7B3FF2',
    fontWeight: '500',
  },
  stampValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#7B3FF2',
  },
  actionRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addStampButton: {
    backgroundColor: '#7B3FF2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addStampButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  redeemButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  redeemButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#64748B',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#7B3FF2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
});
