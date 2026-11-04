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
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useStampHistory, useRewardHistory } from '../../hooks/useApi';
import { ActivityScreenSkeleton } from '../../components/skeleton';

interface StampActivity {
  _id: string;
  customerCard: any;
  business: any;
  addedBy: any;
  stampsAdded: number;
  createdAt: string;
}

interface RewardActivity {
  _id: string;
  customerCard: any;
  business: any;
  customer: any;
  loyaltyCard: any;
  reward: string;
  redeemedBy: any;
  createdAt: string;
}

interface ActivityItem {
  id: string;
  type: 'stamp' | 'reward';
  title: string;
  store: string;
  amount: string;
  isPositive: boolean;
  time: string;
  icon: string;
  iconBg: string;
  date: string;
}

interface ActivityGroup {
  date: string;
  items: ActivityItem[];
}

interface ActivityScreenProps {
  onBack?: () => void;
}

export default function ActivityScreen({ onBack }: ActivityScreenProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Stamps' | 'Rewards'>('All');
  const {
    history: stampHistory,
    loading: stampLoading,
    error: stampError,
    refetch: refetchStamps,
  } = useStampHistory();

  const {
    history: rewardHistory,
    loading: rewardLoading,
    error: rewardError,
    refetch: refetchRewards,
  } = useRewardHistory();

  const filterOptions: Array<'All' | 'Stamps' | 'Rewards'> = [
    'All',
    'Stamps',
    'Rewards',
  ];

  const loading = stampLoading || rewardLoading;

  if (loading && (!stampHistory || stampHistory.length === 0) && (!rewardHistory || rewardHistory.length === 0)) {
    return <ActivityScreenSkeleton />;
  }
  const error = stampError || rewardError;

  // Transform API data to ActivityGroup format
  const transformActivities = (): ActivityGroup[] => {
    const allActivities: ActivityItem[] = [];

    // Process stamp history
    if (stampHistory) {
      stampHistory.forEach((stamp: StampActivity) => {
        const date = new Date(stamp.createdAt);
        const businessName = stamp.business?.businessName || 'Store';
        const icon = 'star';
        const iconBg = '#FEF3C7';

        allActivities.push({
          id: stamp._id,
          type: 'stamp',
          title: 'Stamp Collected',
          store: businessName,
          amount: `+${stamp.stampsAdded || 1}`,
          isPositive: true,
          time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          icon,
          iconBg,
          date: date.toISOString().split('T')[0],
        });
      });
    }

    // Process reward history
    if (rewardHistory) {
      rewardHistory.forEach((reward: RewardActivity) => {
        const date = new Date(reward.createdAt);
        const businessName = reward.business?.businessName || 'Store';
        const rewardName = reward.reward || 'Reward';
        const icon = 'gift';
        const iconBg = '#FCE7F3';

        allActivities.push({
          id: reward._id,
          type: 'reward',
          title: 'Reward Redeemed',
          store: `${rewardName} at ${businessName}`,
          amount: `-${reward.loyaltyCard?.totalStamps || 10}`,
          isPositive: false,
          time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          icon,
          iconBg,
          date: date.toISOString().split('T')[0],
        });
      });
    }

    // Sort by date descending
    allActivities.sort((a, b) => (a.id > b.id ? -1 : 1));

    // Group by date
    const groups: { [key: string]: ActivityItem[] } = {};
    allActivities.forEach(item => {
      const dateKey = item.date;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });

    // Convert to ActivityGroup array with friendly date labels
    return Object.entries(groups).map(([date, items]) => {
      const dateObj = new Date(date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let dateLabel = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      });
      if (dateObj.toDateString() === today.toDateString()) {
        dateLabel = 'Today';
      } else if (dateObj.toDateString() === yesterday.toDateString()) {
        dateLabel = 'Yesterday';
      }

      return { date: dateLabel, items };
    });
  };

  const activities = transformActivities();

  // Filter activities
  const filteredGroups = activities
    .map(group => {
      if (activeFilter === 'All') return group;
      if (activeFilter === 'Stamps') {
        return {
          ...group,
          items: group.items.filter(item => item.type === 'stamp'),
        };
      }
      if (activeFilter === 'Rewards') {
        return {
          ...group,
          items: group.items.filter(item => item.type === 'reward'),
        };
      }
      return { ...group, items: [] };
    })
    .filter(group => group.items.length > 0);

  const handleRefresh = () => {
    refetchStamps();
    refetchRewards();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={styles.headerButton}
            activeOpacity={0.7}
          >
            <MaterialDesignIcons name="arrow-left" size={22} color="#0F172A" />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <Text style={styles.headerTitle}>Activity History</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filter Pills */}
      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filterOptions.map(option => {
            const isActive = activeFilter === option;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.filterPill, isActive && styles.filterPillActive]}
                onPress={() => setActiveFilter(option)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Activity Group List */}
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
        ) : filteredGroups.length > 0 ? (
          filteredGroups.map(group => (
            <View key={group.date} style={styles.dateGroup}>
              <Text style={styles.dateHeader}>{group.date}</Text>

              {group.items.map(item => (
                <View key={item.id} style={styles.activityCard}>
                  <View style={styles.leftRow}>
                    <View
                      style={[
                        styles.iconCircle,
                        { backgroundColor: item.iconBg },
                      ]}
                    >
                      <MaterialDesignIcons
                        name={item.type === 'stamp' ? 'star' : 'gift'}
                        size={20}
                        color={item.type === 'stamp' ? '#D97706' : '#7C3AED'}
                      />
                    </View>

                    <View style={styles.infoCol}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemStore}>{item.store}</Text>
                    </View>
                  </View>

                  <View style={styles.rightCol}>
                    <Text
                      style={[
                        styles.amountText,
                        item.isPositive ? styles.amountPositive : styles.amountNegative,
                      ]}
                    >
                      {item.amount}
                    </Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <MaterialDesignIcons name="history" size={48} color="#94A3B8" />
            </View>
            <Text style={styles.emptyTitle}>No Activity Yet</Text>
            <Text style={styles.emptySubtitle}>
              Your stamp collection and reward redemptions will appear here.
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 44,
  },
  headerIcon: {
    fontSize: 20,
    color: '#1E293B',
    fontWeight: '600',
  },
  filtersWrapper: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 9,
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#F8FAFC',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  itemEmoji: {
    fontSize: 20,
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 3,
  },
  itemStore: {
    fontSize: 13,
    color: '#64748B',
  },
  rightCol: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 3,
  },
  amountPositive: {
    color: '#10B981',
  },
  amountNegative: {
    color: '#EF4444',
  },
  timeText: {
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
  mb8: {
    marginBottom: 8,
  },
});
