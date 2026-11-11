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
import { Gift, History, Star } from 'lucide-react-native';
import {
  useBusinessStampHistory,
  useBusinessRewardHistory,
} from '../../../hooks/useApi';
import { AdminActivityScreenSkeleton } from '../../../components/skeleton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

const FILTERS = ['All', 'Stamps', 'Rewards'] as const;

export default function AdminActivityScreen() {
  const [filter, setFilter] = useState<'All' | 'Stamps' | 'Rewards'>('All');
  const {
    history: stampHistory,
    loading: stampLoading,
    error: stampError,
    refetch: refetchStamps,
  } = useBusinessStampHistory();
  const {
    history: rewardHistory,
    loading: rewardLoading,
    error: rewardError,
    refetch: refetchRewards,
  } = useBusinessRewardHistory();

  const loading = stampLoading || rewardLoading;
  const error = stampError || rewardError;

  if (
    loading &&
    (!stampHistory || stampHistory.length === 0) &&
    (!rewardHistory || rewardHistory.length === 0)
  ) {
    return <AdminActivityScreenSkeleton />;
  }

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
    time: new Date(s.createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));

  const rewardItems = (rewardHistory || []).map((r: any) => ({
    id: r._id,
    type: 'reward' as const,
    name: r.customer?.name || 'Customer',
    action: `Redeemed: ${r.reward || 'Reward'}`,
    amount: `-${r.loyaltyCard?.totalStamps || 10}`,
    isPositive: false,
    time: new Date(r.createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));

  const allItems = [...stampItems, ...rewardItems].sort((a, b) =>
    a.id > b.id ? -1 : 1
  );

  const filtered = allItems.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Stamps') return item.type === 'stamp';
    return item.type === 'reward';
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <View style={styles.header}>
        <Text style={styles.eyebrow}>Ledger</Text>
        <Text style={styles.title}>All Activity</Text>
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterPill, filter === tab && styles.filterPillActive]}
            onPress={() => setFilter(tab)}
            activeOpacity={0.85}
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
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor={PALETTE.primary}
          />
        }
      >
        {error ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filtered.length > 0 ? (
          filtered.map(item => (
            <View key={item.id} style={styles.activityCard}>
              <View
                style={[
                  styles.avatarCircle,
                  item.type === 'stamp'
                    ? styles.avatarStamp
                    : styles.avatarReward,
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
                  <Gift size={18} strokeWidth={2} color={PALETTE.primary} />
                )}
              </View>

              <View style={styles.itemInfo}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.action} numberOfLines={1}>
                  {item.action}
                </Text>
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
                      styles.amount,
                      item.isPositive
                        ? styles.amountPositive
                        : styles.amountNegative,
                    ]}
                  >
                    {item.amount}
                  </Text>
                </View>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <History size={28} strokeWidth={2} color={PALETTE.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Activity Recorded</Text>
            <Text style={styles.emptySubtitle}>
              Activity appears here as customers collect stamps and redeem perks.
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 10,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 4,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.onSurface,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 10,
    marginBottom: 14,
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
    paddingBottom: 120,
    gap: 10,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 16,
    ...SHADOWS.softCard,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: RADII.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarStamp: {
    backgroundColor: PALETTE.border,
  },
  avatarReward: {
    backgroundColor: PALETTE.illusCoralBg,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    ...TYPOGRAPHY.labelMd,
    fontSize: 15,
    color: PALETTE.onSurface,
  },
  action: {
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
  amount: {
    ...TYPOGRAPHY.labelSm,
  },
  amountPositive: {
    color: PALETTE.surface,
  },
  amountNegative: {
    color: PALETTE.primary,
  },
  time: {
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
