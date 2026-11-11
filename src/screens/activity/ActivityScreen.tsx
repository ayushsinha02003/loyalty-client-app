import React, { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AlertCircle,
  ArrowLeft,
  Gift,
  History,
  Star,
} from 'lucide-react-native';
import { useStampHistory, useRewardHistory } from '../../hooks/useApi';
import { ActivityScreenSkeleton } from '../../components/skeleton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

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
  date: string;
}

interface ActivityGroup {
  date: string;
  items: ActivityItem[];
}

interface ActivityScreenProps {
  onBack?: () => void;
}

const FILTER_OPTIONS: Array<'All' | 'Stamps' | 'Rewards'> = [
  'All',
  'Stamps',
  'Rewards',
];

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

  const loading = stampLoading || rewardLoading;

  if (
    loading &&
    (!stampHistory || stampHistory.length === 0) &&
    (!rewardHistory || rewardHistory.length === 0)
  ) {
    return <ActivityScreenSkeleton />;
  }

  const error = stampError || rewardError;

  const transformActivities = (): ActivityGroup[] => {
    const allActivities: ActivityItem[] = [];

    if (stampHistory) {
      stampHistory.forEach((stamp: StampActivity) => {
        const date = new Date(stamp.createdAt);
        const businessName = stamp.business?.businessName || 'Store';

        allActivities.push({
          id: stamp._id,
          type: 'stamp',
          title: 'Stamp Collected',
          store: businessName,
          amount: `+${stamp.stampsAdded || 1}`,
          isPositive: true,
          time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: date.toISOString().split('T')[0],
        });
      });
    }

    if (rewardHistory) {
      rewardHistory.forEach((reward: RewardActivity) => {
        const date = new Date(reward.createdAt);
        const businessName = reward.business?.businessName || 'Store';
        const rewardName = reward.reward || 'Reward';

        allActivities.push({
          id: reward._id,
          type: 'reward',
          title: 'Reward Redeemed',
          store: `${rewardName} at ${businessName}`,
          amount: `-${reward.loyaltyCard?.totalStamps || 10}`,
          isPositive: false,
          time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: date.toISOString().split('T')[0],
        });
      });
    }

    allActivities.sort((a, b) => (a.id > b.id ? -1 : 1));

    const groups: { [key: string]: ActivityItem[] } = {};
    allActivities.forEach(item => {
      const dateKey = item.date;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });

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
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={styles.headerButton}
            activeOpacity={0.75}
            accessibilityLabel="Back"
          >
            <ArrowLeft size={20} strokeWidth={2} color={PALETTE.onSurface} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <Text style={styles.headerTitle}>Activity History</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {FILTER_OPTIONS.map(option => {
            const isActive = activeFilter === option;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.filterPill, isActive && styles.filterPillActive]}
                onPress={() => setActiveFilter(option)}
                activeOpacity={0.85}
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

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor={PALETTE.primary}
          />
        }
      >
        {error ? (
          <View style={styles.errorCard}>
            <AlertCircle size={36} strokeWidth={2} color={PALETTE.primary} />
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
                        item.type === 'stamp'
                          ? styles.iconCircleStamp
                          : styles.iconCircleReward,
                      ]}
                    >
                      {item.type === 'stamp' ? (
                        <Star
                          size={18}
                          strokeWidth={2}
                          color={PALETTE.warning}
                          fill={PALETTE.warning}
                        />
                      ) : (
                        <Gift
                          size={18}
                          strokeWidth={2}
                          color={PALETTE.primary}
                        />
                      )}
                    </View>

                    <View style={styles.infoCol}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemStore} numberOfLines={1}>
                        {item.store}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.rightCol}>
                    <View
                      style={[
                        styles.amountPill,
                        item.isPositive
                          ? styles.amountPillPositive
                          : styles.amountPillNegative,
                      ]}
                    >
                      <Text
                        style={[
                          styles.amountText,
                          item.isPositive
                            ? styles.amountPositive
                            : styles.amountNegative,
                        ]}
                      >
                        {item.amount}
                      </Text>
                    </View>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <History size={28} strokeWidth={2} color={PALETTE.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Activity Yet</Text>
            <Text style={styles.emptySubtitle}>
              Your stamp collections and reward redemptions will appear here.
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
    backgroundColor: PALETTE.surfaceAlt,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  headerTitle: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.softCard,
  },
  placeholder: {
    width: 44,
  },
  filtersWrapper: {
    paddingVertical: 6,
  },
  filterScroll: {
    paddingHorizontal: 24,
    gap: 10,
  },
  filterPill: {
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: RADII.full,
  },
  filterPillActive: {
    backgroundColor: PALETTE.surfaceContrast,
    borderColor: PALETTE.surfaceContrast,
  },
  filterText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onSurfaceVariant,
  },
  filterTextActive: {
    color: PALETTE.surface,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 120,
  },
  dateGroup: {
    marginBottom: 22,
  },
  dateHeader: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 10,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 16,
    marginBottom: 10,
    ...SHADOWS.softCard,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: RADII.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCircleStamp: {
    backgroundColor: PALETTE.border,
  },
  iconCircleReward: {
    backgroundColor: PALETTE.illusCoralBg,
  },
  infoCol: {
    flex: 1,
  },
  itemTitle: {
    ...TYPOGRAPHY.labelMd,
    fontSize: 15,
    color: PALETTE.onSurface,
  },
  itemStore: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    marginTop: 2,
  },
  rightCol: {
    alignItems: 'flex-end',
  },
  amountPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADII.sm,
  },
  amountPillPositive: {
    backgroundColor: PALETTE.surfaceContrast,
  },
  amountPillNegative: {
    backgroundColor: PALETTE.illusCoralBg,
  },
  amountText: {
    ...TYPOGRAPHY.labelSm,
  },
  amountPositive: {
    color: PALETTE.surface,
  },
  amountNegative: {
    color: PALETTE.primary,
  },
  timeText: {
    ...TYPOGRAPHY.caption,
    fontSize: 11,
    color: PALETTE.onSurfaceMuted,
    marginTop: 4,
  },
  errorCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 28,
    alignItems: 'center',
    gap: 12,
    ...SHADOWS.softCard,
  },
  errorText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: PALETTE.primary,
    paddingHorizontal: 28,
    height: 48,
    borderRadius: RADII.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.btn,
  },
  retryButtonText: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onPrimary,
  },
  emptyState: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    ...SHADOWS.softCard,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    ...TYPOGRAPHY.headlineMd,
    color: PALETTE.onSurface,
    marginBottom: 6,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
    textAlign: 'center',
  },
});
