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
  Alert,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PrimaryText from '../../components/text/PrimaryText';
import { useExploreCards } from '../../hooks/useApi';
import { SearchScreenSkeleton } from '../../components/skeleton';
import { customerCardApi } from '../../services/api';

interface SearchScreenProps {
  onJoinSuccess?: () => void;
}

const categories = ['All', 'Cafe', 'Restaurant', 'Retail', 'Salon', 'Fitness'];

const getCategoryIcon = (
  cat: string
): React.ComponentProps<typeof MaterialDesignIcons>['name'] => {
  const c = cat.toLowerCase();
  if (c.includes('cafe') || c.includes('coffee')) return 'coffee';
  if (c.includes('restaurant') || c.includes('food')) return 'silverware-fork-knife';
  if (c.includes('salon') || c.includes('barber') || c.includes('beauty')) return 'content-cut';
  if (c.includes('fit') || c.includes('gym')) return 'dumbbell';
  if (c.includes('retail') || c.includes('shop')) return 'shopping-outline';
  return 'storefront-outline';
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
          `You've successfully joined ${businessName}'s loyalty program! Start collecting stamps on your next visit.`,
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <PrimaryText text="Explore Programs" customStyle={styles.title} />
        <PrimaryText
          text="Discover local businesses & start collecting stamps"
          customStyle={styles.subtitle}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <MaterialDesignIcons name="magnify" size={22} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by store or reward..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 ? (
          <TouchableOpacity onPress={() => setSearch('')} hitSlop={10}>
            <MaterialDesignIcons name="close-circle" size={18} color="#94A3B8" />
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
        {error ? (
          <View style={styles.errorContainer}>
            <MaterialDesignIcons name="alert-circle-outline" size={44} color="#EF4444" style={styles.mb12} />
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
            const categoryIcon = getCategoryIcon(category);

            return (
              <View key={card._id} style={styles.programCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.storeAvatar}>
                    <MaterialDesignIcons name={categoryIcon} size={24} color="#7C3AED" />
                  </View>
                  <View style={styles.storeInfo}>
                    <Text style={styles.storeName}>{businessName}</Text>
                    <Text style={styles.storeCategory}>{category}</Text>
                    {address ? (
                      <View style={styles.addressRow}>
                        <MaterialDesignIcons name="map-marker-outline" size={13} color="#94A3B8" style={styles.mr4} />
                        <Text style={styles.storeAddress} numberOfLines={1}>
                          {address}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>

                {/* Reward Banner */}
                <View style={styles.rewardBanner}>
                  <View style={styles.rewardIconCircle}>
                    <MaterialDesignIcons name="gift-outline" size={18} color="#7C3AED" />
                  </View>
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
                  <MaterialDesignIcons name="plus-circle-outline" size={18} color="#FFFFFF" style={styles.mr6} />
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
              <MaterialDesignIcons name="magnify-remove-outline" size={48} color="#94A3B8" />
            </View>
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
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
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
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 6,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  categoryScrollContainer: {
    marginTop: 8,
    marginBottom: 10,
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
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  cardsList: {
    paddingHorizontal: 20,
    paddingBottom: 90,
    gap: 16,
  },
  programCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderLeftWidth: 4,
    borderLeftColor: '#7C3AED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  storeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  storeCategory: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '600',
    marginTop: 2,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  storeAddress: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
  },
  rewardBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5FF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3E8FF',
  },
  rewardIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rewardTextCol: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#581C87',
  },
  rewardSubtitle: {
    fontSize: 12,
    color: '#7E22CE',
    marginTop: 1,
  },
  cardDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 14,
  },
  joinButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  joinButtonLoading: {
    opacity: 0.7,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
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
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 14,
  },
  retryButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  mr4: { marginRight: 4 },
  mr6: { marginRight: 6 },
  mb12: { marginBottom: 12 },
});
