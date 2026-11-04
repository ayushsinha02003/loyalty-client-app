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
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
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
        <View>
          <PrimaryText text="Rewards Catalog" customStyle={styles.title} />
          <Text style={styles.subtitle}>
            {rewards.length} active {rewards.length === 1 ? 'reward' : 'rewards'} configured
          </Text>
        </View>

        <TouchableOpacity
          onPress={onAddReward}
          style={styles.addButton}
          activeOpacity={0.8}
        >
          <MaterialDesignIcons name="plus" size={18} color="#FFFFFF" style={styles.mr4} />
          <Text style={styles.addButtonText}>New Reward</Text>
        </TouchableOpacity>
      </View>

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
        ) : rewards.length > 0 ? (
          rewards.map((reward: RewardItem) => (
            <View key={reward._id} style={styles.rewardCard}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: reward.backgroundColor || '#EDE9FE' },
                ]}
              >
                <MaterialDesignIcons name="gift" size={24} color="#7C3AED" />
              </View>

              <View style={styles.rewardInfo}>
                <PrimaryText text={reward.reward || 'Reward'} customStyle={styles.rewardName} />
                <View style={styles.metaRow}>
                  <MaterialDesignIcons name="star" size={13} color="#F59E0B" style={styles.mr4} />
                  <PrimaryText
                    text={`${reward.totalStamps || 10} Stamps Required • ${reward.title}`}
                    customStyle={styles.rewardStamps}
                  />
                </View>
              </View>

              <Switch
                trackColor={{ false: '#CBD5E1', true: '#C4B5FD' }}
                thumbColor={reward.isActive !== false ? '#7B3FF2' : '#F1F5F9'}
                value={reward.isActive !== false}
                onValueChange={() => toggleReward(reward._id, reward.isActive !== false)}
                disabled={togglingId === reward._id}
              />
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <MaterialDesignIcons name="gift-open-outline" size={48} color="#94A3B8" />
            </View>
            <Text style={styles.emptyTitle}>No Rewards Yet</Text>
            <Text style={styles.emptySubtitle}>
              Create loyalty cards with rewards to start rewarding your customers!
            </Text>
            <TouchableOpacity
              style={styles.emptyActionButton}
              onPress={onAddReward}
              activeOpacity={0.8}
            >
              <MaterialDesignIcons name="plus" size={18} color="#FFFFFF" style={styles.mr6} />
              <Text style={styles.emptyActionText}>Add Reward</Text>
            </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
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
  addButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 90,
    gap: 14,
  },
  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rewardInfo: {
    flex: 1,
    marginRight: 12,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardStamps: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
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
    marginBottom: 20,
  },
  emptyActionButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyActionText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
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
  mb8: { marginBottom: 8 },
});
