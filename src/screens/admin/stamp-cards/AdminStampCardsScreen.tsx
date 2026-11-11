import React, { useState } from 'react';
import {
  Alert,
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
  Cake,
  Coffee,
  CreditCard,
  Dumbbell,
  Gift,
  Hash,
  Pizza,
  Plus,
  Scissors,
  Star,
  Trash2,
  Utensils,
} from 'lucide-react-native';
import { useBusinessLoyaltyCards } from '../../../hooks/useApi';
import PrimaryText from '../../../components/text/PrimaryText';
import { AdminStampCardsScreenSkeleton } from '../../../components/skeleton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

interface AdminStampCardsScreenProps {
  onAddCard?: () => void;
}

const TILE_BACKGROUNDS = [
  PALETTE.illusCoralBg,
  PALETTE.illusWarmYellow,
  PALETTE.illusWarmOrange,
  PALETTE.illusNeutralCream,
  PALETTE.illusCoolBlue,
] as const;

const getIconForCard = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes('coffee') || lower.includes('tea')) return Coffee;
  if (lower.includes('pizza')) return Pizza;
  if (lower.includes('sandwich') || lower.includes('burger') || lower.includes('food')) {
    return Utensils;
  }
  if (lower.includes('ice cream') || lower.includes('dessert') || lower.includes('cake')) {
    return Cake;
  }
  if (lower.includes('hair') || lower.includes('salon') || lower.includes('spa')) {
    return Scissors;
  }
  if (lower.includes('gym') || lower.includes('fitness')) return Dumbbell;
  return Star;
};

export default function AdminStampCardsScreen({
  onAddCard,
}: AdminStampCardsScreenProps) {
  const { cards, loading, error, refetch, deleteCard } =
    useBusinessLoyaltyCards();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (loading && (!cards || cards.length === 0)) {
    return <AdminStampCardsScreenSkeleton />;
  }

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Delete Stamp Card',
      'Are you sure you want to delete this stamp card? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeletingId(id);
            try {
              const success = await deleteCard(id);
              if (success) {
                Alert.alert('Deleted', 'Stamp card deleted successfully');
                refetch();
              } else {
                Alert.alert('Error', 'Failed to delete stamp card');
              }
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Failed to delete stamp card');
            } finally {
              setDeletingId(null);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <View style={styles.header}>
        <View>
          <PrimaryText text="Programs" customStyle={styles.eyebrow} />
          <PrimaryText text="Stamp Cards" customStyle={styles.title} />
          <Text style={styles.subtitle}>
            {cards?.length || 0} active loyalty{' '}
            {cards?.length === 1 ? 'card' : 'cards'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onAddCard}
          style={styles.addButton}
          activeOpacity={0.85}
        >
          <Plus size={16} strokeWidth={2.5} color={PALETTE.onPrimary} />
          <Text style={styles.addButtonText}>New Card</Text>
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
        ) : cards.length > 0 ? (
          cards.map((card: any, index: number) => {
            const IconComp = getIconForCard(card.title || '');
            const wellBg = TILE_BACKGROUNDS[index % TILE_BACKGROUNDS.length];
            const iconTint =
              wellBg === PALETTE.illusCoolBlue || wellBg === PALETTE.illusWarmOrange
                ? PALETTE.surface
                : wellBg === PALETTE.illusCoralBg
                  ? PALETTE.primary
                  : PALETTE.surfaceContrast;
            const totalStamps = card.totalStamps || 10;

            return (
              <View key={card._id} style={styles.cardWrapper}>
                <View style={styles.cardHeader}>
                  <View style={[styles.cardIconBox, { backgroundColor: wellBg }]}>
                    <IconComp size={22} strokeWidth={2} color={iconTint} />
                  </View>

                  <View style={styles.cardHeaderInfo}>
                    <PrimaryText
                      text={card.title}
                      customStyle={styles.cardTitle}
                    />
                    <PrimaryText
                      text={card.description || `Reward: ${card.reward}`}
                      customStyle={styles.cardSubtitle}
                      numberOfLines={1}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => handleDelete(card._id)}
                    style={styles.deleteButton}
                    activeOpacity={0.75}
                    disabled={deletingId === card._id}
                  >
                    <Trash2
                      size={18}
                      strokeWidth={2}
                      color={
                        deletingId === card._id
                          ? PALETTE.onSurfaceMuted
                          : PALETTE.primary
                      }
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.stampDotsRow}>
                  {Array.from({ length: totalStamps }).map((_, i) => {
                    const isLast = i === totalStamps - 1;
                    return (
                      <View
                        key={i}
                        style={[
                          styles.stampCircle,
                          isLast && styles.stampCircleLast,
                        ]}
                      >
                        {isLast ? (
                          <Gift
                            size={14}
                            strokeWidth={2}
                            color={PALETTE.primary}
                          />
                        ) : (
                          <Star
                            size={13}
                            strokeWidth={2}
                            color={PALETTE.onSurfaceMuted}
                          />
                        )}
                      </View>
                    );
                  })}
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.metaRow}>
                    <Hash
                      size={13}
                      strokeWidth={2}
                      color={PALETTE.onSurfaceVariant}
                    />
                    <Text style={styles.progressText}>
                      {totalStamps} Stamps
                    </Text>
                  </View>

                  <View style={styles.rewardPill}>
                    <Gift size={12} strokeWidth={2} color={PALETTE.primary} />
                    <Text style={styles.rewardText} numberOfLines={1}>
                      {card.reward}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <CreditCard size={28} strokeWidth={2} color={PALETTE.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Stamp Cards Yet</Text>
            <Text style={styles.emptySubtitle}>
              Create your first loyalty stamp card to reward repeat customers.
            </Text>
            <TouchableOpacity
              style={styles.emptyActionButton}
              onPress={onAddCard}
              activeOpacity={0.85}
            >
              <Plus size={18} strokeWidth={2.5} color={PALETTE.onPrimary} />
              <Text style={styles.emptyActionText}>Create Loyalty Card</Text>
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
    color: PALETTE.onSurface,
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: PALETTE.primary,
    paddingHorizontal: 16,
    height: 42,
    borderRadius: RADII.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    ...SHADOWS.btn,
  },
  addButtonText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onPrimary,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    gap: 16,
  },
  cardWrapper: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 20,
    ...SHADOWS.softCard,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: RADII.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardHeaderInfo: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
  },
  cardSubtitle: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    marginTop: 2,
  },
  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampDotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: PALETTE.border,
  },
  stampCircle: {
    width: 30,
    height: 30,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surfaceAlt,
    borderWidth: 1,
    borderColor: PALETTE.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampCircleLast: {
    backgroundColor: PALETTE.illusCoralBg,
    borderColor: PALETTE.primary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    gap: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  progressText: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    fontWeight: '600',
  },
  rewardPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: PALETTE.surfaceContrast,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADII.full,
    maxWidth: '60%',
  },
  rewardText: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 11,
    color: PALETTE.surface,
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
