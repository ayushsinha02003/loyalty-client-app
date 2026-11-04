import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import PrimaryText from '../../components/text/PrimaryText';
import { useAvailableRewards, useRewardHistory } from '../../hooks/useApi';
import { rewardApi } from '../../services/api';
import { RewardsScreenSkeleton } from '../../components/skeleton';

type TabKey = 'available' | 'claimed';

const tabs: { key: TabKey; label: string }[] = [
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

  // Hook must be called unconditionally at the top level
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
        Alert.alert('Success 🎉', 'Reward redeemed successfully! Enjoy your gift.');
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
    <View style={styles.container}>
      <PrimaryText text="Rewards" customStyle={styles.title} />

      <View style={styles.tabs}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.key;
          let count = 0;
          if (tab.key === 'available') {
            count = rewards?.length || 0;
          } else {
            count = claimedRewards?.length || 0;
          }

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
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
            const rewardText = item.loyaltyCard?.reward || item.reward || 'Special Reward';
            const totalStamps = item.loyaltyCard?.totalStamps || 10;
            const currentStamps = item.currentStamps || totalStamps;
            const progress = totalStamps > 0 ? Math.min((currentStamps / totalStamps) * 100, 100) : 100;

            return (
              <View key={item._id} style={styles.card}>
                <View style={styles.cardContent}>
                  <View style={styles.rewardIcon}>
                    <Text style={styles.rewardIconText}>🎁</Text>
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.rewardTitle}>{rewardText}</Text>
                    <Text style={styles.businessName}>{businessName}</Text>

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

                  {isAvailable && (
                    <TouchableOpacity
                      style={[
                        styles.button,
                        redeemingId === item._id && styles.buttonLoading,
                      ]}
                      onPress={() => handleRedeem(item._id)}
                      disabled={redeemingId !== null}
                    >
                      <Text style={styles.buttonText}>
                        {redeemingId === item._id ? 'Redeeming...' : 'Redeem'}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {!isAvailable && (
                    <View style={styles.claimedBadge}>
                      <Text style={styles.claimedBadgeText}>Claimed ✓</Text>
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
            <Text style={styles.emptyIcon}>🎁</Text>
            <Text style={styles.emptyTitle}>
              {activeTab === 'available' ? 'No Available Rewards' : 'No Claimed Rewards'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'available'
                ? 'Complete your stamp cards to unlock and redeem free rewards!'
                : 'Your redeemed rewards history will appear here.'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default RewardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 10,
  },
  tab: {
    backgroundColor: '#ECECEC',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#7B3FF2',
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  scrollList: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748B',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardIcon: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardIconText: {
    fontSize: 24,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  rewardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  businessName: {
    color: '#7B3FF2',
    marginTop: 2,
    fontSize: 13,
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#7B3FF2',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#7B3FF2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonLoading: {
    backgroundColor: '#A5B4FC',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  claimedBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  claimedBadgeText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 13,
  },
  claimedDate: {
    marginTop: 8,
    fontSize: 12,
    color: '#94A3B8',
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
