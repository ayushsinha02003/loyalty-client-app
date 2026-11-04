import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useBusinessLoyaltyCards } from '../../../hooks/useApi';
import PrimaryText from '../../../components/text/PrimaryText';
import { loyaltyCardApi } from '../../../services/api';
import { AdminRewardsScreenSkeleton } from '../../../components/skeleton';

interface RewardItem {
  _id: string;
  title: string;
  totalStamps: number;
  reward: string;
  isActive?: boolean;
  backgroundColor?: string;
  textColor?: string;
  icon?: string;
}

interface AdminRewardsScreenProps {
  onAddReward?: () => void;
}

export default function AdminRewardsScreen({
  onAddReward,
}: AdminRewardsScreenProps) {
  const { cards, loading, error, refetch } = useBusinessLoyaltyCards();
  const [togglingId, setTogglingId] = useState<string | null>(null);

  if (loading && (!cards || cards.length === 0)) {
    return <AdminRewardsScreenSkeleton />;
  }

  // Filter cards that have rewards
  const rewards = cards?.filter((card: any) => card.reward) || [];

  const toggleReward = async (id: string, currentStatus: boolean) => {
    setTogglingId(id);
    try {
      const response = await loyaltyCardApi.update(id, { isActive: !currentStatus });
      if (response.success) {
        refetch();
      } else {
        Alert.alert('Error', response.message || 'Failed to update reward');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to update reward');
    } finally {
      setTogglingId(null);
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
        <PrimaryText text="Rewards" customStyle={styles.title} />
        <TouchableOpacity
          onPress={onAddReward}
          style={styles.addButton}
          activeOpacity={0.8}
        >
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
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
            <Text style={styles.loadingText}>Loading rewards...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : rewards.length > 0 ? (
          rewards.map((reward: RewardItem) => (
            <View key={reward._id} style={styles.rewardCard}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: reward.backgroundColor || '#EDE9FE' },
                ]}
              >
                <Text style={styles.rewardEmoji}>{reward.icon || '🎁'}</Text>
              </View>

              <View style={styles.rewardInfo}>
                <PrimaryText text={reward.reward || 'Reward'} customStyle={styles.rewardName} />
                <PrimaryText
                  text={`${reward.totalStamps || 10} Stamps Required • ${reward.title}`}
                  customStyle={styles.rewardStamps}
                />
              </View>

              <Switch
                trackColor={{ false: '#CBD5E1', true: '#C4B5FD' }}
                thumbColor={reward.isActive ? '#7B3FF2' : '#F1F5F9'}
                value={reward.isActive !== false}
                onValueChange={() => toggleReward(reward._id, reward.isActive !== false)}
                disabled={togglingId === reward._id}
              />
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎁</Text>
            <Text style={styles.emptyTitle}>No Rewards Yet</Text>
            <Text style={styles.emptySubtitle}>
              Create loyalty cards with rewards to start rewarding your customers!
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7B3FF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: -2,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rewardEmoji: {
    fontSize: 24,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  rewardStamps: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
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
