import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Coffee,
  Dumbbell,
  QrCode,
  Scissors,
  Sparkles,
  Utensils,
} from 'lucide-react-native';
import { getCurrentUser } from '../../services/authService';
import PrimaryHeader from '../../components/common/PrimaryHeader';
import PrimaryStampProgressCard from '../../components/cards/stampProgressCard/PrimaryStampProgressCard';
import PrimaryText from '../../components/text/PrimaryText';
import PrimaryLoyaltyStampCard from '../../components/cards/loyaltyStampCard/PrimaryLoyaltyStampCard';
import LoyaltySteps from '../../components/loyalty/PrimaryLoyaltyStampCard';
import { useCustomerDashboard } from '../../hooks/useApi';
import { HomeScreenSkeleton } from '../../components/skeleton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';
const cardImage = require('../../assets/images/stamp-reward.png');

interface HomeScreenProps {
  onOpenScanner?: () => void;
  onSeeAll?: () => void;
}

const FEATURED_CATEGORIES = [
  {
    key: 'Cafe',
    label: 'Coffee',
    subtitle: 'Daily brews',
    bg: PALETTE.illusWarmYellow,
    iconColor: PALETTE.surfaceContrast,
    textColor: PALETTE.surfaceContrast,
    subColor: PALETTE.surfaceContrast,
    Icon: Coffee,
  },
  {
    key: 'Restaurant',
    label: 'Dining',
    subtitle: 'Local bites',
    bg: PALETTE.illusWarmOrange,
    iconColor: PALETTE.surface,
    textColor: PALETTE.surface,
    subColor: PALETTE.surface,
    Icon: Utensils,
  },
  {
    key: 'Salon',
    label: 'Beauty',
    subtitle: 'Self care',
    bg: PALETTE.illusNeutralCream,
    iconColor: PALETTE.surfaceContrast,
    textColor: PALETTE.surfaceContrast,
    subColor: PALETTE.onSurfaceVariant,
    Icon: Scissors,
  },
  {
    key: 'Fitness',
    label: 'Fitness',
    subtitle: 'Wellness clubs',
    bg: PALETTE.illusCoolBlue,
    iconColor: PALETTE.surface,
    textColor: PALETTE.surface,
    subColor: PALETTE.onSurfaceMuted,
    Icon: Dumbbell,
  },
] as const;

const HomeScreen = ({ onOpenScanner, onSeeAll }: HomeScreenProps) => {
  const { dashboard, loading, error, refetch } = useCustomerDashboard();
  const [userName, setUserName] = useState('Friend');

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.name) {
      setUserName(user.name);
    }
  }, []);

  const handleRefresh = () => {
    refetch();
  };

  const activeCard = dashboard?.customerCards?.find(
    (card: any) => !card.isRewardAvailable
  );
  const completedCard = dashboard?.customerCards?.find(
    (card: any) => card.isRewardAvailable
  );
  const displayCard = activeCard || completedCard || dashboard?.customerCards?.[0];
  const rewardReadyCount =
    dashboard?.customerCards?.filter((c: any) => c.isRewardAvailable).length || 0;

  if (loading) {
    return <HomeScreenSkeleton />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <PrimaryHeader
          name={userName}
          subtitle="Welcome back"
          notificationCount={0}
        />
        <View style={styles.errorContainer}>
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PrimaryHeader
        name={userName}
        subtitle="Loyalty Wallet"
        notificationCount={rewardReadyCount}
        onNotificationPress={() => {
          onSeeAll?.();
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor={PALETTE.primary}
          />
        }
      >
        {/* Active Stamp Progress Card or Empty Scanner CTA */}
        {displayCard ? (
          <PrimaryStampProgressCard
            title={displayCard.loyaltyCard?.title || 'Featured Card'}
            image={cardImage}
            icon={displayCard.loyaltyCard?.icon || 'trophy-award'}
            currentStamps={displayCard.currentStamps || 0}
            totalStamps={displayCard.loyaltyCard?.totalStamps || 10}
            message={
              (typeof displayCard.loyaltyCard?.business === 'object'
                ? displayCard.loyaltyCard.business?.businessName
                : undefined) || 'Keep collecting to unlock rewards'
            }
          />
        ) : (
          <View style={styles.emptyHeroCard}>
            <View style={styles.heroBadge}>
              <Sparkles size={13} strokeWidth={2} color={PALETTE.primary} />
              <Text style={styles.heroBadgeText}>Start Collecting</Text>
            </View>
            <Text style={styles.emptyTitle}>No Stamp Cards Yet</Text>
            <Text style={styles.emptySubtitle}>
              Scan a QR code at any participating shop to join their loyalty card and earn rewards.
            </Text>
            {onOpenScanner && (
              <TouchableOpacity
                style={styles.scanButton}
                onPress={onOpenScanner}
                activeOpacity={0.85}
              >
                <QrCode size={18} strokeWidth={2} color={PALETTE.onPrimary} />
                <Text style={styles.scanButtonText}>Open QR Scanner</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Featured Categories Showcase */}
        <View style={styles.sectionHeader}>
          <PrimaryText text="Popular Perks" customStyle={styles.sectionTitle} />
          {onSeeAll && (
            <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
              <PrimaryText text="See all" customStyle={styles.seeAll} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tilesRow}
        >
          {FEATURED_CATEGORIES.map(tile => {
            const { Icon } = tile;
            return (
              <TouchableOpacity
                key={tile.key}
                style={[styles.categoryTile, { backgroundColor: tile.bg }]}
                onPress={onSeeAll}
                activeOpacity={0.88}
              >
                <View style={styles.tileIconBadge}>
                  <Icon size={22} strokeWidth={2} color={tile.iconColor} />
                </View>
                <View>
                  <Text style={[styles.tileTitle, { color: tile.textColor }]}>
                    {tile.label}
                  </Text>
                  <Text style={[styles.tileSubtitle, { color: tile.subColor }]}>
                    {tile.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* My Stamp Cards */}
        <View style={styles.sectionHeader}>
          <PrimaryText text="My Stamp Cards" customStyle={styles.sectionTitle} />
          <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
            <PrimaryText text="See all" customStyle={styles.seeAll} />
          </TouchableOpacity>
        </View>

        {dashboard?.customerCards && dashboard.customerCards.length > 0 ? (
          dashboard.customerCards.map((card: any) => (
            <PrimaryLoyaltyStampCard
              key={card._id}
              merchantName={
                card.loyaltyCard?.business?.businessName ||
                card.loyaltyCard?.title ||
                'Local Store'
              }
              rewardText={card.loyaltyCard?.reward || 'Earn rewards!'}
              currentStamps={card.currentStamps || 0}
              totalStamps={card.loyaltyCard?.totalStamps || 10}
              isRewardAvailable={card.isRewardAvailable}
              backgroundColor={card.loyaltyCard?.backgroundColor}
              textColor={card.loyaltyCard?.textColor}
            />
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Your Wallet Is Ready</Text>
            <Text style={styles.emptySubtitle}>
              Tap below to scan a store QR code and collect your very first stamp.
            </Text>
            {onOpenScanner && (
              <TouchableOpacity
                style={styles.scanButton}
                onPress={onOpenScanner}
                activeOpacity={0.85}
              >
                <QrCode size={18} strokeWidth={2} color={PALETTE.onPrimary} />
                <Text style={styles.scanButtonText}>Scan Store QR</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* How It Works */}
        <View style={styles.sectionHeader}>
          <PrimaryText text="How It Works" customStyle={styles.sectionTitle} />
        </View>

        <LoyaltySteps />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 120,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    ...TYPOGRAPHY.headlineMd,
    color: PALETTE.onSurface,
  },
  seeAll: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 14,
    color: PALETTE.primary,
  },
  tilesRow: {
    gap: 12,
    paddingRight: 8,
  },
  categoryTile: {
    width: 148,
    height: 152,
    borderRadius: RADII.xl,
    padding: 18,
    justifyContent: 'space-between',
    ...SHADOWS.softCard,
  },
  tileIconBadge: {
    width: 44,
    height: 44,
    borderRadius: RADII.full,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileTitle: {
    ...TYPOGRAPHY.headlineSm,
    fontWeight: '800',
  },
  tileSubtitle: {
    ...TYPOGRAPHY.caption,
    marginTop: 2,
    opacity: 0.9,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorCard: {
    width: '100%',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 24,
    alignItems: 'center',
    ...SHADOWS.softCard,
  },
  errorText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
    textAlign: 'center',
    marginBottom: 16,
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
  emptyHeroCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 24,
    alignItems: 'center',
    ...SHADOWS.softCard,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PALETTE.surfaceContrast,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADII.full,
    marginBottom: 14,
  },
  heroBadgeText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.surface,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 24,
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    ...SHADOWS.softCard,
  },
  emptyTitle: {
    ...TYPOGRAPHY.headlineMd,
    color: PALETTE.onSurface,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 20,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: PALETTE.primary,
    paddingHorizontal: 24,
    height: 52,
    borderRadius: RADII.full,
    ...SHADOWS.btn,
  },
  scanButtonText: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onPrimary,
  },
});
