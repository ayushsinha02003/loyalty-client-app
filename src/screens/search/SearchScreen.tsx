import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PrimaryText from '../../components/text/PrimaryText';
import { useExploreCards } from '../../hooks/useApi';
import { SearchScreenSkeleton } from '../../components/skeleton';
import { customerCardApi } from '../../services/api';

interface SearchScreenProps {
  onJoinSuccess?: () => void;
}

const categories = ['All', 'Cafe', 'Restaurant', 'Retail', 'Salon', 'Fitness'];

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
          'Joined! 🎉',
          `You joined the loyalty program for ${businessName}! You can now collect stamps.`
        );
        onJoinSuccess?.();
      } else {
        Alert.alert('Notice', response.message || 'Unable to join card');
      }
    } catch (err: any) {
      Alert.alert('Notice', err.message || 'Already joined or unable to join');
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <PrimaryText text="Discover Programs" customStyle={styles.title} />
        <Text style={styles.subtitle}>
          Explore participating shops and earn exciting loyalty rewards
        </Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by store or reward..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 ? (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Category Filter Pills */}
      <View style={styles.categoryScrollContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryPill,
                  isSelected && styles.categoryPillActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.8}
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
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7B3FF2" />
            <Text style={styles.loadingText}>Finding loyalty programs...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={refetch}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredCards.length > 0 ? (
          filteredCards.map((card: any) => {
            const business = typeof card.business === 'object' ? card.business : null;
            const businessName = business?.businessName || card.title || 'Store';
            const category = business?.category || 'Retail';
            const address = business?.address ? `${business.address}, ${business.city || ''}` : '';
            const isJoining = joiningId === card._id;

            return (
              <View key={card._id} style={styles.programCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.storeAvatar}>
                    <Text style={styles.storeEmoji}>🏪</Text>
                  </View>
                  <View style={styles.storeInfo}>
                    <Text style={styles.storeName}>{businessName}</Text>
                    <Text style={styles.storeCategory}>{category}</Text>
                    {address ? (
                      <Text style={styles.storeAddress} numberOfLines={1}>
                        📍 {address}
                      </Text>
                    ) : null}
                  </View>
                </View>

                {/* Reward Banner */}
                <View style={styles.rewardBanner}>
                  <Text style={styles.rewardIcon}>🎁</Text>
                  <View style={styles.rewardTextCol}>
                    <Text style={styles.rewardTitle}>{card.reward || 'Special Gift'}</Text>
                    <Text style={styles.rewardSubtitle}>
                      Earn {card.totalStamps || 10} stamps to unlock
                    </Text>
                  </View>
                </View>

                {/* Card Description */}
                {card.description ? (
                  <Text style={styles.cardDesc} numberOfLines={2}>
                    {card.description}
                  </Text>
                ) : null}

                {/* Join Program Button */}
                <TouchableOpacity
                  style={[styles.joinButton, isJoining && styles.joinButtonLoading]}
                  onPress={() => handleJoin(card._id, businessName)}
                  disabled={isJoining}
                  activeOpacity={0.85}
                >
                  <Text style={styles.joinButtonText}>
                    {isJoining ? 'Joining...' : '+ Join Loyalty Card'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No Programs Found</Text>
            <Text style={styles.emptySubtitle}>
              {search
                ? 'Try a different store name, category, or keyword.'
                : 'No active loyalty programs found. Check back soon!'}
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
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 20,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 14,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    paddingVertical: 0,
  },
  clearText: {
    fontSize: 16,
    color: '#94A3B8',
    padding: 4,
  },
  categoryScrollContainer: {
    marginBottom: 16,
  },
  categoryList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryPillActive: {
    backgroundColor: '#7B3FF2',
    borderColor: '#7B3FF2',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  cardsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 16,
  },
  programCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  storeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  storeEmoji: {
    fontSize: 22,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
  },
  storeCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7B3FF2',
    marginTop: 2,
  },
  storeAddress: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  rewardBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  rewardIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  rewardTextCol: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  rewardSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 14,
  },
  joinButton: {
    backgroundColor: '#7B3FF2',
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonLoading: {
    backgroundColor: '#A78BFA',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: '#64748B',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  errorText: {
    fontSize: 15,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#7B3FF2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
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
