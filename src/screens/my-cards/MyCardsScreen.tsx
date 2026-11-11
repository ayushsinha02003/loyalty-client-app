import React, { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard } from 'lucide-react-native';
import PrimaryText from '../../components/text/PrimaryText';
import PrimarySearchBar from '../../components/searchBar/PrimarySearchBar';
import PrimaryLoyaltyStampCard from '../../components/cards/loyaltyStampCard/PrimaryLoyaltyStampCard';
import { useCustomerCards } from '../../hooks/useApi';
import { MyCardsScreenSkeleton } from '../../components/skeleton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

const MyCardsScreen = () => {
  const { cards, loading, error, refetch } = useCustomerCards();
  const [search, setSearch] = useState('');

  const filteredCards =
    cards?.filter(
      (card: any) =>
        card.loyaltyCard?.title?.toLowerCase().includes(search.toLowerCase()) ||
        card.loyaltyCard?.business?.businessName
          ?.toLowerCase()
          .includes(search.toLowerCase())
    ) || [];

  const handleRefresh = () => {
    refetch();
  };

  if (loading) {
    return <MyCardsScreenSkeleton />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <PrimaryText text="Your Wallet" customStyle={styles.eyebrow} />
          <PrimaryText text="My Cards" customStyle={styles.title} />
        </View>
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
      <View style={styles.header}>
        <PrimaryText text="Your Wallet" customStyle={styles.eyebrow} />
        <PrimaryText text="My Cards" customStyle={styles.title} />
      </View>

      <View style={styles.searchContainer}>
        <PrimarySearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search cards or stores..."
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.cardsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor={PALETTE.primary}
          />
        }
      >
        {filteredCards.length > 0 ? (
          filteredCards.map((card: any) => (
            <PrimaryLoyaltyStampCard
              key={card._id}
              merchantName={
                card.loyaltyCard?.business?.businessName ||
                card.loyaltyCard?.title ||
                'Local Business'
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
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <CreditCard size={28} strokeWidth={2} color={PALETTE.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Stamp Cards Yet</Text>
            <Text style={styles.emptySubtitle}>
              {search
                ? 'No matching cards found. Try another keyword.'
                : 'Scan a QR code at a participating business to join their loyalty program.'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyCardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  header: {
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 18,
  },
  cardsList: {
    paddingHorizontal: 24,
    paddingBottom: 120,
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 24,
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
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
    marginBottom: 8,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
    textAlign: 'center',
  },
});
