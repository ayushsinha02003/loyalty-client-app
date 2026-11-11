import React, { useMemo, useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Gift, History, Sparkles } from 'lucide-react-native';
import PrimaryText from '../../components/text/PrimaryText';
import { useAvailableRewards, useRewardHistory } from '../../hooks/useApi';
import { rewardApi } from '../../services/api';
import { RewardsScreenSkeleton } from '../../components/skeleton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

type TabKey = 'available' | 'claimed';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'available', label: 'Available' },
  { key: 'claimed', label: 'Claimed' },
];

const RewardsScreen = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('available');
  const {
    rewards,
    loading: rewardsLoading,
    error: rewardsError,
    refetch: refetchRewards,
  } = useAvailableRewards();

  const {
    history: claimedRewards,
    loading: historyLoading,
    error: historyError,
    refetch: refetchHistory,
  } = useRewardHistory();

  const [redeemingId, setRedeemingId] = useState<string | null>(null);

  const filteredRewards = useMemo(() => {
    if (activeTab === 'available') {
      return rewards || [];
    }
    return claimedRewards || [];
  }, [activeTab, rewards, claimedRewards]);

  const handleRedeem = async (customerCardId: string) => {
    setRedeemingId(customerCardId);
    try {
      const response = await rewardApi.redeem(customerCardId);
      if (response.success) {
        Alert.alert('Success', 'Reward redeemed successfully! Enjoy your perk.');
        refetchRewards();
        refetchHistory();
      } else {
        Alert.alert('Error', response.message || 'Failed to redeem reward');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to redeem reward');
    } finally {
      setRedeemingId(null);
    }
  };

  if (rewardsLoading && historyLoading) {
    return <RewardsScreenSkeleton />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <PrimaryText text="Earned Perks" customStyle={styles.eyebrow} />
        <PrimaryText text="Rewards" customStyle={styles.title} />
      </View>

      <View style={styles.tabs}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.key;
          const count =
            tab.key === 'available'
              ? rewards?.length || 0
              : claimedRewards?.length || 0;

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.85}
            >
              <Text style={[styles.tabText, isActive && styles.activeText]}>
                {tab.label} ({count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {rewardsError && activeTab === 'available' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{rewardsError}</Text>
        </View>
      )}

      {historyError && activeTab === 'claimed' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{historyError}</Text>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
        refreshControl={
          <RefreshControl
            refreshing={rewardsLoading || historyLoading}
            onRefresh={activeTab === 'available' ? refetchRewards : refetchHistory}
            tintColor={PALETTE.primary}
          />
        }
      >
        {filteredRewards.length > 0 ? (
          filteredRewards.map((item: any) => {
            const isAvailable = activeTab === 'available';
            const businessName =
              item.loyaltyCard?.business?.businessName ||
              item.business?.businessName ||
              'Participating Business';
            const rewardText =
              item.loyaltyCard?.reward || item.reward || 'Special Reward';
            const totalStamps = item.loyaltyCard?.totalStamps || 10;
            const currentStamps = item.currentStamps || totalStamps;
            const progress =
              totalStamps > 0
                ? Math.min((currentStamps / totalStamps) * 100, 100)
                : 100;

            return (
              <View key={item._id} style={styles.card}>
                <View style={styles.cardContent}>
                  <View style={styles.rewardIcon}>
                    <Gift size={22} strokeWidth={2} color={PALETTE.primary} />
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.rewardTitle} numberOfLines={1}>
                      {rewardText}
                    </Text>
                    <Text style={styles.businessName} numberOfLines={1}>
                      {businessName}
                    </Text>

                    {isAvailable && (
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                          <View
                            style={[
                              styles.progressFill,
                              { width: `${progress}%` },
                            ]}
                          />
                        </View>
                        <Text style={styles.progressText}>
                          {currentStamps}/{totalStamps} stamps completed
                        </Text>
                      </View>
                    )}
                  </View>

                  {isAvailable ? (
                    <TouchableOpacity
                      style={[
                        styles.button,
                        redeemingId === item._id && styles.buttonLoading,
                      ]}
                      onPress={() => handleRedeem(item._id)}
                      disabled={redeemingId !== null}
                      activeOpacity={0.85}
                    >
                      <Sparkles
                        size={14}
                        strokeWidth={2}
                        color={PALETTE.onPrimary}
                      />
                      <Text style={styles.buttonText}>
                        {redeemingId === item._id ? 'Wait...' : 'Redeem'}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.claimedBadge}>
                      <Check
                        size={12}
                        strokeWidth={2.5}
                        color={PALETTE.primary}
                      />
                      <Text style={styles.claimedBadgeText}>Claimed</Text>
                    </View>
                  )}
                </View>

                {!isAvailable && item.createdAt && (
                  <Text style={styles.claimedDate}>
                    Claimed on {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
                )}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              {activeTab === 'available' ? (
                <Gift size={28} strokeWidth={2} color={PALETTE.primary} />
              ) : (
                <History size={28} strokeWidth={2} color={PALETTE.primary} />
              )}
            </View>
            <Text style={styles.emptyTitle}>
              {activeTab === 'available'
                ? 'No Available Rewards'
                : 'No Claimed Rewards'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'available'
                ? 'Complete your stamp cards to unlock and redeem free perks.'
                : 'Your redeemed rewards history will appear here.'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RewardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
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
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 18,
    gap: 10,
  },
  tab: {
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: RADII.full,
  },
  activeTab: {
    backgroundColor: PALETTE.surfaceContrast,
    borderColor: PALETTE.surfaceContrast,
  },
  tabText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onSurfaceVariant,
  },
  activeText: {
    color: PALETTE.surface,
  },
  scrollList: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    gap: 14,
  },
  card: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 18,
    ...SHADOWS.softCard,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardIcon: {
    width: 48,
    height: 48,
    borderRadius: RADII.lg,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  rewardTitle: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
  },
  businessName: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: PALETTE.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: PALETTE.primary,
    borderRadius: 3,
  },
  progressText: {
    ...TYPOGRAPHY.caption,
    fontSize: 11,
    color: PALETTE.onSurfaceMuted,
    marginTop: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: PALETTE.primary,
    paddingHorizontal: 16,
    height: 40,
    borderRadius: RADII.full,
    ...SHADOWS.btn,
  },
  buttonLoading: {
    opacity: 0.7,
  },
  buttonText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onPrimary,
  },
  claimedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: PALETTE.surfaceContrast,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADII.full,
  },
  claimedBadgeText: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 11,
    color: PALETTE.surface,
  },
  claimedDate: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceMuted,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: PALETTE.border,
  },
  errorContainer: {
    marginHorizontal: 24,
    marginBottom: 14,
    padding: 14,
    borderRadius: RADII.lg,
    backgroundColor: PALETTE.illusCoralBg,
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurface,
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
