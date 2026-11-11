import React, { useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AlertCircle,
  Coffee,
  Dumbbell,
  Gift,
  MapPin,
  Plus,
  Scissors,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Utensils,
  X,
} from 'lucide-react-native';
import PrimaryText from '../../components/text/PrimaryText';
import { useExploreCards } from '../../hooks/useApi';
import { SearchScreenSkeleton } from '../../components/skeleton';
import { customerCardApi } from '../../services/api';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

interface SearchScreenProps {
  onJoinSuccess?: () => void;
}

const CATEGORIES = ['All', 'Cafe', 'Restaurant', 'Retail', 'Salon', 'Fitness'];

const getCategoryVisuals = (cat: string) => {
  const c = cat.toLowerCase();
  if (c.includes('cafe') || c.includes('coffee')) {
    return { Icon: Coffee, bg: PALETTE.illusWarmYellow, tint: PALETTE.surfaceContrast };
  }
  if (c.includes('restaurant') || c.includes('food')) {
    return { Icon: Utensils, bg: PALETTE.illusWarmOrange, tint: PALETTE.surface };
  }
  if (c.includes('salon') || c.includes('barber') || c.includes('beauty')) {
    return { Icon: Scissors, bg: PALETTE.illusNeutralCream, tint: PALETTE.surfaceContrast };
  }
  if (c.includes('fit') || c.includes('gym')) {
    return { Icon: Dumbbell, bg: PALETTE.illusCoolBlue, tint: PALETTE.surface };
  }
  if (c.includes('retail') || c.includes('shop')) {
    return { Icon: ShoppingBag, bg: PALETTE.illusCoralBg, tint: PALETTE.primary };
  }
  return { Icon: Store, bg: PALETTE.illusCoralBg, tint: PALETTE.primary };
};

export default function SearchScreen({ onJoinSuccess }: SearchScreenProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { cards, loading, error, refetch } = useExploreCards();
  const [joiningId, setJoiningId] = useState<string | null>(null);

  if (loading && (!cards || cards.length === 0)) {
    return <SearchScreenSkeleton />;
  }

  const filteredCards = (cards || []).filter((card: any) => {
    const businessName =
      (typeof card.business === 'object' ? card.business?.businessName : '') ||
      card.title ||
      '';
    const category =
      (typeof card.business === 'object' ? card.business?.category : '') || '';
    const reward = card.reward || '';

    const matchesSearch =
      businessName.toLowerCase().includes(search.toLowerCase()) ||
      category.toLowerCase().includes(search.toLowerCase()) ||
      reward.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const handleJoin = async (cardId: string, businessName: string) => {
    setJoiningId(cardId);
    try {
      const response = await customerCardApi.join(cardId);
      if (response.success) {
        Alert.alert(
          'Joined Program',
          `You've joined ${businessName}'s loyalty program! Collect stamps on your next visit.`,
          [
            {
              text: 'View My Cards',
              onPress: () => onJoinSuccess?.(),
            },
            {
              text: 'Keep Exploring',
              style: 'cancel',
            },
          ]
        );
      } else {
        Alert.alert('Join Status', response.message || 'Could not join program');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to join loyalty card');
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <PrimaryText text="Discover Partners" customStyle={styles.eyebrow} />
        <PrimaryText text="Explore Programs" customStyle={styles.title} />
        <PrimaryText
          text="Find local shops & unlock stamp rewards"
          customStyle={styles.subtitle}
        />
      </View>

      {/* Signature Pill Search Input with Coral Circle CTA */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchPill}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search store or reward..."
            placeholderTextColor={PALETTE.onSurfaceMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch('')}
              hitSlop={10}
              style={styles.clearBtn}
            >
              <X size={16} strokeWidth={2} color={PALETTE.onSurfaceMuted} />
            </TouchableOpacity>
          )}
          <View style={styles.searchSubmitCircle}>
            <Search size={18} strokeWidth={2} color={PALETTE.onPrimary} />
          </View>
        </View>
      </View>

      {/* Category Filter Pills */}
      <View style={styles.categoryScrollContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryPill,
                  isSelected && styles.categoryPillActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Program Cards */}
      <ScrollView
        contentContainerStyle={styles.cardsList}
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
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredCards.length > 0 ? (
          filteredCards.map((card: any) => {
            const business =
              typeof card.business === 'object' ? card.business : null;
            const businessName =
              business?.businessName || card.title || 'Local Partner';
            const category = business?.category || 'Retail';
            const address = business?.address
              ? `${business.address}${business.city ? `, ${business.city}` : ''}`
              : '';
            const isJoining = joiningId === card._id;
            const visual = getCategoryVisuals(category);
            const { Icon } = visual;

            return (
              <View key={card._id} style={styles.programCard}>
                {/* Category & Stamp Badges Row */}
                <View style={styles.cardHeader}>
                  <View
                    style={[styles.storeAvatar, { backgroundColor: visual.bg }]}
                  >
                    <Icon size={24} strokeWidth={2} color={visual.tint} />
                  </View>

                  <View style={styles.storeInfo}>
                    <View style={styles.badgesRow}>
                      <View style={styles.contrastBadge}>
                        <Sparkles
                          size={11}
                          strokeWidth={2}
                          color={PALETTE.primary}
                        />
                        <Text style={styles.contrastBadgeText}>{category}</Text>
                      </View>
                      <View style={styles.statBadge}>
                        <Star
                          size={11}
                          strokeWidth={2}
                          color={PALETTE.warning}
                          fill={PALETTE.warning}
                        />
                        <Text style={styles.statBadgeText}>
                          {card.totalStamps || 10} stamps
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.storeName} numberOfLines={1}>
                      {businessName}
                    </Text>

                    {address ? (
                      <View style={styles.addressRow}>
                        <MapPin
                          size={12}
                          strokeWidth={2}
                          color={PALETTE.onSurfaceMuted}
                        />
                        <Text style={styles.storeAddress} numberOfLines={1}>
                          {address}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>

                {/* Reward Well */}
                <View style={styles.rewardBanner}>
                  <View style={styles.rewardIconCircle}>
                    <Gift size={18} strokeWidth={2} color={PALETTE.primary} />
                  </View>
                  <View style={styles.rewardTextCol}>
                    <Text style={styles.rewardTitle} numberOfLines={1}>
                      {card.reward || 'Special Reward'}
                    </Text>
                    <Text style={styles.rewardSubtitle}>
                      Collect {card.totalStamps || 10} stamps to unlock
                    </Text>
                  </View>
                </View>

                {card.description ? (
                  <Text style={styles.cardDesc} numberOfLines={2}>
                    {card.description}
                  </Text>
                ) : null}

                <TouchableOpacity
                  style={[styles.joinButton, isJoining && styles.joinButtonLoading]}
                  onPress={() => handleJoin(card._id, businessName)}
                  disabled={isJoining}
                  activeOpacity={0.85}
                >
                  <Plus size={18} strokeWidth={2} color={PALETTE.onPrimary} />
                  <Text style={styles.joinButtonText}>
                    {isJoining ? 'Joining...' : 'Join Loyalty Card'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Search size={30} strokeWidth={2} color={PALETTE.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Programs Found</Text>
            <Text style={styles.emptySubtitle}>
              {search
                ? 'Try a different store name, category, or reward keyword.'
                : 'No active loyalty programs found yet. Check back soon!'}
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
  subtitle: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
    marginTop: 4,
  },
  searchWrapper: {
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 10,
  },
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.full,
    paddingLeft: 20,
    paddingRight: 7,
    height: 54,
    borderWidth: 1,
    borderColor: PALETTE.border,
    ...SHADOWS.softCard,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
    paddingRight: 8,
  },
  clearBtn: {
    padding: 6,
    marginRight: 4,
  },
  searchSubmitCircle: {
    width: 40,
    height: 40,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryScrollContainer: {
    marginBottom: 8,
  },
  categoryList: {
    paddingHorizontal: 24,
    gap: 8,
    paddingVertical: 6,
  },
  categoryPill: {
    backgroundColor: PALETTE.surface,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: RADII.full,
    borderWidth: 1,
    borderColor: PALETTE.border,
  },
  categoryPillActive: {
    backgroundColor: PALETTE.surfaceContrast,
    borderColor: PALETTE.surfaceContrast,
  },
  categoryText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onSurfaceVariant,
  },
  categoryTextActive: {
    color: PALETTE.surface,
  },
  cardsList: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 120,
    gap: 16,
  },
  programCard: {
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
  storeAvatar: {
    width: 56,
    height: 56,
    borderRadius: RADII.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  storeInfo: {
    flex: 1,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  contrastBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: PALETTE.surfaceContrast,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADII.full,
  },
  contrastBadgeText: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 11,
    color: PALETTE.surface,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: PALETTE.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADII.sm,
  },
  statBadgeText: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 11,
    fontWeight: '800',
    color: PALETTE.onSurface,
  },
  storeName: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  storeAddress: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceMuted,
    flex: 1,
  },
  rewardBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surfaceAlt,
    borderRadius: RADII.lg,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: PALETTE.border,
  },
  rewardIconCircle: {
    width: 38,
    height: 38,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rewardTextCol: {
    flex: 1,
  },
  rewardTitle: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onSurface,
  },
  rewardSubtitle: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    marginTop: 2,
  },
  cardDesc: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
    marginTop: 12,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: PALETTE.primary,
    borderRadius: RADII.full,
    height: 50,
    marginTop: 16,
    ...SHADOWS.btn,
  },
  joinButtonLoading: {
    opacity: 0.7,
  },
  joinButtonText: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onPrimary,
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
  retryText: {
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
