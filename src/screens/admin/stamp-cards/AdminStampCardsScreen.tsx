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
  ActivityIndicator,
} from 'react-native';
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
              await deleteCard(id);
              Alert.alert('Success', 'Stamp card deleted successfully');
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Failed to delete card');
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

  const getIconForCard = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('coffee')) return '☕';
    if (lower.includes('pizza')) return '🍕';
    if (lower.includes('sandwich') || lower.includes('burger')) return '🥪';
    if (lower.includes('ice cream') || lower.includes('dessert')) return '🍦';
    if (lower.includes('hair') || lower.includes('salon') || lower.includes('spa')) return '✂️';
    if (lower.includes('gym') || lower.includes('fitness')) return '💪';
    return '🎫';
  };

  const getColorForCard = (index: number) => {
    const colors = ['#7B3FF2', '#4F46E5', '#10B981', '#F59E0B', '#EC4899', '#3B82F6'];
    return colors[index % colors.length];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <PrimaryText text="My Stamp Cards" customStyle={styles.title} />
        <TouchableOpacity
          onPress={onAddCard}
          style={styles.addButton}
          activeOpacity={0.8}
        >
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7B3FF2" />
            <Text style={styles.loadingText}>Loading stamp cards...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : cards.length > 0 ? (
          cards.map((card: any, index: number) => {
            const icon = getIconForCard(card.title);
            const color = card.backgroundColor || getColorForCard(index);
            const totalStamps = card.totalStamps || 10;

            return (
              <View
                key={card._id}
                style={[styles.cardWrapper, { borderLeftColor: color }]}
              >
                <View style={styles.cardHeader}>
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
                    <Text style={styles.deleteButtonText}>
                      {deletingId === card._id ? '...' : '🗑️'}
                    </Text>
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
                        <Text style={styles.stampCircleText}>
                          {isLast ? '🎁' : icon}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.progressText}>
                    {totalStamps} Stamps Program
                  </Text>
                  <View style={styles.rewardPill}>
                    <Text style={styles.rewardText}>🎁 {card.reward}</Text>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎫</Text>
            <Text style={styles.emptyTitle}>No Stamp Cards Yet</Text>
            <Text style={styles.emptySubtitle}>
              Create your first loyalty stamp card to start rewarding customers!
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7B3FF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: -2,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  cardHeaderInfo: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
  },
  stampDotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 10,
  },
  stampCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampCircleLast: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  stampCircleText: {
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#F1F5F9',
  },
  progressText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  rewardPill: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  rewardText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7B3FF2',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 10,
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
