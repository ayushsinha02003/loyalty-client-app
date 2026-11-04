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
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
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
        Alert.alert('Stamp Added', `Successfully awarded 1 stamp to ${customerName}.`);
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
        Alert.alert('Reward Redeemed', `Reward successfully claimed for ${customerName}!`);
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
        <View>
          <PrimaryText text="Customers" customStyle={styles.title} />
          <Text style={styles.subtitle}>
            {customers?.length || 0} active {customers?.length === 1 ? 'member' : 'members'} enrolled
          </Text>
        </View>

        {onOpenScanner && (
          <TouchableOpacity
            style={styles.scanHeaderButton}
            onPress={onOpenScanner}
            activeOpacity={0.8}
          >
            <MaterialDesignIcons name="qrcode-scan" size={16} color="#7C3AED" style={styles.mr6} />
            <Text style={styles.scanHeaderButtonText}>Scan QR</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Search Bar Row */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <MaterialDesignIcons name="magnify" size={20} color="#94A3B8" style={styles.mr8} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, phone, or card..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 ? (
            <TouchableOpacity onPress={() => setSearch('')} hitSlop={10}>
              <MaterialDesignIcons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          ) : null}
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
        {error ? (
          <View style={styles.errorContainer}>
            <MaterialDesignIcons name="alert-circle-outline" size={40} color="#EF4444" style={styles.mb8} />
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
            const initial = customer.name ? customer.name.charAt(0).toUpperCase() : null;

            return (
              <View key={customerCard._id} style={styles.customerCard}>
                <View style={styles.customerRow}>
                  <View style={styles.avatarCircle}>
                    {initial ? (
                      <Text style={styles.avatarInitial}>{initial}</Text>
                    ) : (
                      <MaterialDesignIcons name="account" size={22} color="#7C3AED" />
                    )}
                  </View>

                  <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{customer.name || 'Customer'}</Text>
                    <View style={styles.detailRow}>
                      <MaterialDesignIcons name="phone-outline" size={12} color="#64748B" style={styles.mr4} />
                      <Text style={styles.customerPhone}>{customer.phone || 'No phone'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <MaterialDesignIcons name="credit-card-outline" size={12} color="#7C3AED" style={styles.mr4} />
                      <Text style={styles.cardTitle}>{card.title || 'Loyalty Program'}</Text>
                    </View>
                  </View>

                  <View style={[styles.stampBadge, isRewardReady && styles.stampBadgeReady]}>
                    <Text style={[styles.stampValue, isRewardReady && styles.stampValueReady]}>
                      {customerCard.currentStamps || 0}/{card.totalStamps || 10}
                    </Text>
                    <View style={styles.stampLabelRow}>
                      {isRewardReady && (
                        <MaterialDesignIcons name="gift" size={11} color="#B45309" style={styles.mr2} />
                      )}
                      <Text style={[styles.stampLabel, isRewardReady && styles.stampLabelReady]}>
                        {isRewardReady ? 'Ready' : 'Stamps'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Actions row: Add Stamp & Redeem Reward */}
                <View style={styles.actionRow}>
                  {isRewardReady ? (
                    <TouchableOpacity
                      style={styles.redeemButton}
                      onPress={() => handleRedeemReward(customerCard._id, customer.name || 'Customer')}
                      disabled={isProcessing}
                      activeOpacity={0.8}
                    >
                      <MaterialDesignIcons name="gift" size={16} color="#FFFFFF" style={styles.mr6} />
                      <Text style={styles.redeemButtonText}>
                        {isProcessing ? 'Redeeming...' : 'Redeem Reward'}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.addStampButton}
                      onPress={() => handleAddStamp(customerCard._id, customer.name || 'Customer')}
                      disabled={isProcessing}
                      activeOpacity={0.8}
                    >
                      <MaterialDesignIcons name="plus-circle" size={16} color="#FFFFFF" style={styles.mr6} />
                      <Text style={styles.addStampButtonText}>
                        {isProcessing ? 'Adding Stamp...' : 'Add 1 Stamp'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <MaterialDesignIcons name="account-group-outline" size={48} color="#94A3B8" />
            </View>
            <Text style={styles.emptyTitle}>No Customers Found</Text>
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
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  scanHeaderButton: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  scanHeaderButtonText: {
    color: '#7C3AED',
    fontWeight: '700',
    fontSize: 13,
  },
  searchRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 90,
    gap: 14,
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: '800',
    color: '#7C3AED',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  customerPhone: {
    fontSize: 12,
    color: '#64748B',
  },
  cardTitle: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '600',
  },
  stampBadge: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stampBadgeReady: {
    backgroundColor: '#D1FAE5',
    borderColor: '#A7F3D0',
  },
  stampValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  stampValueReady: {
    color: '#059669',
  },
  stampLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  stampLabelReady: {
    color: '#059669',
  },
  mr2: {
    marginRight: 2,
  },
  actionRow: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  addStampButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  addStampButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  redeemButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  redeemButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  mr4: { marginRight: 4 },
  mr6: { marginRight: 6 },
  mr8: { marginRight: 8 },
  mb8: { marginBottom: 8 },
});
