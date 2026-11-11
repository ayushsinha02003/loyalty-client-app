import React, { useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertCircle, Gift, Plus, Star } from 'lucide-react-native';
import { useBusinessLoyaltyCards } from '../../../hooks/useApi';
import PrimaryText from '../../../components/text/PrimaryText';
import { loyaltyCardApi } from '../../../services/api';
import { AdminRewardsScreenSkeleton } from '../../../components/skeleton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

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

  const rewards = cards?.filter((card: any) => card.reward) || [];

  const toggleReward = async (id: string, currentStatus: boolean) => {
    setTogglingId(id);
    try {
      const response = await loyaltyCardApi.update(id, {
        isActive: !currentStatus,
      });
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <View style={styles.header}>
        <View>
          <PrimaryText text="Perks Management" customStyle={styles.eyebrow} />
          <PrimaryText text="Rewards Catalog" customStyle={styles.title} />
          <Text style={styles.subtitle}>
            {rewards.length} active{' '}
            {rewards.length === 1 ? 'reward' : 'rewards'} configured
          </Text>
        </View>

        <TouchableOpacity
          onPress={onAddReward}
          style={styles.addButton}
          activeOpacity={0.85}
        >
          <Plus size={16} strokeWidth={2.5} color={PALETTE.onPrimary} />
          <Text style={styles.addButtonText}>New Reward</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            tintColor={PALETTE.primary}
          />
        }
      >
        {error ? (
          <View style={styles.errorCard}>
            <AlertCircle size={36} strokeWidth={2} color={PALETTE.primary} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={refetch}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : rewards.length > 0 ? (
          rewards.map((reward: RewardItem) => (
            <View key={reward._id} style={styles.rewardCard}>
              <View style={styles.iconCircle}>
                <Gift size={22} strokeWidth={2} color={PALETTE.primary} />
              </View>

              <View style={styles.rewardInfo}>
                <PrimaryText
                  text={reward.reward || 'Reward'}
                  customStyle={styles.rewardName}
                />
                <View style={styles.metaRow}>
                  <Star
                    size={13}
                    strokeWidth={2}
                    color={PALETTE.warning}
                    fill={PALETTE.warning}
                  />
                  <PrimaryText
                    text={`${reward.totalStamps || 10} Stamps • ${reward.title}`}
                    customStyle={styles.rewardStamps}
                    numberOfLines={1}
                  />
                </View>
              </View>

              <Switch
                trackColor={{
                  false: PALETTE.border,
                  true: PALETTE.illusCoralBg,
                }}
                thumbColor={
                  reward.isActive !== false
                    ? PALETTE.primary
                    : PALETTE.onSurfaceMuted
                }
                value={reward.isActive !== false}
                onValueChange={() =>
                  toggleReward(reward._id, reward.isActive !== false)
                }
                disabled={togglingId === reward._id}
              />
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Gift size={28} strokeWidth={2} color={PALETTE.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Rewards Yet</Text>
            <Text style={styles.emptySubtitle}>
              Create loyalty cards with perks to keep your customers returning.
            </Text>
            <TouchableOpacity
              style={styles.emptyActionButton}
              onPress={onAddReward}
              activeOpacity={0.85}
            >
              <Plus size={18} strokeWidth={2.5} color={PALETTE.onPrimary} />
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
    backgroundColor: PALETTE.surfaceAlt,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 14,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 4,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    fontSize: 28,
    lineHeight: 34,
    color: PALETTE.onSurface,
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: PALETTE.primary,
    paddingHorizontal: 14,
    height: 42,
    borderRadius: RADII.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    ...SHADOWS.btn,
  },
  addButtonText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onPrimary,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    gap: 12,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 18,
    ...SHADOWS.softCard,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: RADII.lg,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rewardInfo: {
    flex: 1,
    marginRight: 10,
  },
  rewardName: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  rewardStamps: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    flex: 1,
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
    marginBottom: 20,
  },
  emptyActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: PALETTE.primary,
    paddingHorizontal: 24,
    height: 50,
    borderRadius: RADII.full,
    ...SHADOWS.btn,
  },
  emptyActionText: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onPrimary,
  },
});
