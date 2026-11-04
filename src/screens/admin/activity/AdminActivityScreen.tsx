import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useBusinessStampHistory, useBusinessRewardHistory } from '../../../hooks/useApi';

export default function AdminActivityScreen() {
  const [filter, setFilter] = useState<'All' | 'Stamps' | 'Rewards'>('All');
  const { history: stampHistory, loading: stampLoading, error: stampError, refetch: refetchStamps } = useBusinessStampHistory();
  const { history: rewardHistory, loading: rewardLoading, error: rewardError, refetch: refetchRewards } = useBusinessRewardHistory();

  const loading = stampLoading || rewardLoading;
  const error = stampError || rewardError;

  const handleRefresh = () => {
    refetchStamps();
    refetchRewards();
  };

  const stampItems = (stampHistory || []).map((s: any) => ({
    id: s._id,
    type: 'stamp' as const,
    name: s.customerCard?.customer?.name || 'Customer',
    action: `Collected stamp on ${s.customerCard?.loyaltyCard?.title || 'Card'}`,
    amount: `+${s.stampsAdded || 1}`,
    isPositive: true,
    time: new Date(s.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: new Date(s.createdAt).toLocaleDateString(),
    avatarBg: '#EEF2FF',
  }));

  const rewardItems = (rewardHistory || []).map((r: any) => ({
    id: r._id,
    type: 'reward' as const,
    name: r.customer?.name || 'Customer',
    action: `Redeemed: ${r.reward || 'Reward'}`,
    amount: `-${r.loyaltyCard?.totalStamps || 10}`,
    isPositive: false,
    time: new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: new Date(r.createdAt).toLocaleDateString(),
    avatarBg: '#FEF3C7',
  }));

  const allItems = [...stampItems, ...rewardItems].sort((a, b) => (a.id > b.id ? -1 : 1));

  const filtered = allItems.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Stamps') return item.type === 'stamp';
    if (filter === 'Rewards') return item.type === 'reward';
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>All Activity</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(['All', 'Stamps', 'Rewards'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterPill, filter === tab && styles.filterPillActive]}
            onPress={() => setFilter(tab)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterText,
                filter === tab && styles.filterTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
            <Text style={styles.loadingText}>Loading activity...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filtered.length > 0 ? (
          filtered.map(item => (
            <View key={item.id} style={styles.activityCard}>
              <View
                style={[styles.avatarCircle, { backgroundColor: item.avatarBg }]}
              >
                <Text style={styles.avatarInitial}>{item.name.charAt(0)}</Text>
              </View>

              <View style={styles.itemInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.action}>{item.action}</Text>
              </View>

              <View style={styles.rightCol}>
                <Text
                  style={[
                    styles.amount,
                    item.isPositive ? styles.amountPositive : styles.amountNegative,
                  ]}
                >
                  {item.amount}
                </Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No Activity Recorded</Text>
            <Text style={styles.emptySubtitle}>
              Activity will appear here as customers collect stamps and redeem rewards.
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
    paddingBottom: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterPillActive: {
    backgroundColor: '#7B3FF2',
    borderColor: '#7B3FF2',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
  },
  itemInfo: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 3,
  },
  action: {
    fontSize: 13,
    color: '#64748B',
  },
  rightCol: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 3,
  },
  amountPositive: {
    color: '#16A34A',
  },
  amountNegative: {
    color: '#DC2626',
  },
  time: {
    fontSize: 12,
    color: '#94A3B8',
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
