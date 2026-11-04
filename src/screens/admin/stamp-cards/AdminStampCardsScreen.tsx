import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Alert,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useBusinessLoyaltyCards } from '../../../hooks/useApi';
import PrimaryText from '../../../components/text/PrimaryText';
import { AdminStampCardsScreenSkeleton } from '../../../components/skeleton';

interface AdminStampCardsScreenProps {
  onAddCard?: () => void;
}

export default function AdminStampCardsScreen({
  onAddCard,
}: AdminStampCardsScreenProps) {
  const { cards, loading, error, refetch, deleteCard } = useBusinessLoyaltyCards();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (loading && (!cards || cards.length === 0)) {
    return <AdminStampCardsScreenSkeleton />;
  }

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Delete Stamp Card',
      'Are you sure you want to delete this stamp card? This action cannot be undone.',
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

  const handleRefresh = () => {
    refetch();
  };

  const getIconForCard = (
    title: string
  ): React.ComponentProps<typeof MaterialDesignIcons>['name'] => {
    const lower = title.toLowerCase();
    if (lower.includes('coffee') || lower.includes('tea')) return 'coffee';
    if (lower.includes('pizza') || lower.includes('food')) return 'pizza';
    if (lower.includes('sandwich') || lower.includes('burger')) return 'hamburger';
    if (lower.includes('ice cream') || lower.includes('dessert')) return 'ice-cream';
    if (lower.includes('hair') || lower.includes('salon') || lower.includes('spa')) return 'content-cut';
    if (lower.includes('gym') || lower.includes('fitness')) return 'dumbbell';
    return 'star-circle-outline';
  };

  const getColorForCard = (index: number) => {
    const colors = ['#7C3AED', '#4F46E5', '#0D9488', '#EA580C', '#DB2777', '#2563EB'];
    return colors[index % colors.length];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <PrimaryText text="Stamp Cards" customStyle={styles.title} />
          <Text style={styles.subtitle}>
            {cards?.length || 0} active loyalty {cards?.length === 1 ? 'card' : 'cards'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onAddCard}
          style={styles.addButton}
          activeOpacity={0.8}
        >
          <MaterialDesignIcons name="plus" size={18} color="#FFFFFF" style={styles.mr4} />
          <Text style={styles.addButtonText}>New Card</Text>
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
        ) : cards.length > 0 ? (
          cards.map((card: any, index: number) => {
            const iconName = getIconForCard(card.title);
            const color = card.backgroundColor || getColorForCard(index);
            const totalStamps = card.totalStamps || 10;

            return (
              <View
                key={card._id}
                style={[styles.cardWrapper, { borderLeftColor: color }]}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardIconBox}>
                    <MaterialDesignIcons name={iconName} size={22} color={color} />
                  </View>

                  <View style={styles.cardHeaderInfo}>
                    <PrimaryText text={card.title} customStyle={styles.cardTitle} />
                    <PrimaryText
                      text={card.description || `Reward: ${card.reward}`}
                      customStyle={styles.cardSubtitle}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => handleDelete(card._id)}
                    style={styles.deleteButton}
                    activeOpacity={0.7}
                    disabled={deletingId === card._id}
                  >
                    <MaterialDesignIcons
                      name="trash-can-outline"
                      size={20}
                      color={deletingId === card._id ? '#94A3B8' : '#EF4444'}
                    />
                  </TouchableOpacity>
                </View>

                {/* Stamp Dots Visual Preview */}
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
                        <MaterialDesignIcons
                          name={isLast ? 'gift' : 'star'}
                          size={15}
                          color={isLast ? '#7C3AED' : '#94A3B8'}
                        />
                      </View>
                    );
                  })}
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.metaRow}>
                    <MaterialDesignIcons name="counter" size={14} color="#64748B" style={styles.mr4} />
                    <Text style={styles.progressText}>
                      {totalStamps} Stamps Required
                    </Text>
                  </View>

                  <View style={styles.rewardPill}>
                    <MaterialDesignIcons name="gift-outline" size={13} color="#7C3AED" style={styles.mr4} />
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
              <MaterialDesignIcons name="credit-card-plus-outline" size={48} color="#94A3B8" />
            </View>
            <Text style={styles.emptyTitle}>No Stamp Cards Yet</Text>
            <Text style={styles.emptySubtitle}>
              Create your first loyalty stamp card to start rewarding repeat customers!
            </Text>
            <TouchableOpacity
              style={styles.emptyActionButton}
              onPress={onAddCard}
              activeOpacity={0.8}
            >
              <MaterialDesignIcons name="plus" size={18} color="#FFFFFF" style={styles.mr6} />
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
    gap: 16,
  },
  cardWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderLeftWidth: 4,
    borderColor: '#E2E8F0',
    padding: 18,
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
  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeaderInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampDotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 12,
  },
  stampCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampCircleLast: {
    borderColor: '#C4B5FD',
    backgroundColor: '#FAF5FF',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  rewardPill: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '55%',
  },
  rewardText: {
    fontSize: 12,
    color: '#6D28D9',
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
