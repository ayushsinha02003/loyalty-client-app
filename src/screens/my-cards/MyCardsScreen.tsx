import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryText from '../../components/text/PrimaryText';
import PrimarySearchBar from '../../components/searchBar/PrimarySearchBar';
import PrimaryLoyaltyStampCard from '../../components/cards/loyaltyStampCard/PrimaryLoyaltyStampCard';
import { useCustomerCards } from '../../hooks/useApi';
import { MyCardsScreenSkeleton } from '../../components/skeleton';

const MyCardsScreen = () => {
  const { cards, loading, error, refetch } = useCustomerCards();
  const [search, setSearch] = useState('');

  const filteredCards = cards?.filter((card: any) =>
    card.loyaltyCard?.title?.toLowerCase().includes(search.toLowerCase()) ||
    card.loyaltyCard?.business?.businessName?.toLowerCase().includes(search.toLowerCase())
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
          <PrimaryText text="My Cards" customStyle={styles.title} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <PrimaryText text="My Cards" customStyle={styles.title} />
      </View>

      <View style={styles.searchContainer}>
        <PrimarySearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search cards..."
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.cardsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        {filteredCards.length > 0 ? (
          filteredCards.map((card: any) => (
            <PrimaryLoyaltyStampCard
              key={card._id}
              merchantName={card.loyaltyCard?.business?.businessName || card.loyaltyCard?.title || 'Unknown Business'}
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
            <Text style={styles.emptyTitle}>No Stamp Cards Yet</Text>
            <Text style={styles.emptySubtitle}>
              {search ? 'No matching cards found.' : 'Scan a QR code at a participating business to join their loyalty program!'}
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
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  cardsList: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  loadingText: {
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
    paddingVertical: 40,
    paddingHorizontal: 24,
    flex: 1,
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