import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface AdminStampCardsScreenProps {
  onAddCard?: () => void;
}

export default function AdminStampCardsScreen({
  onAddCard,
}: AdminStampCardsScreenProps) {
  const cards = [
    {
      id: '1',
      title: 'Coffee Lover Card',
      subtitle: 'Buy 10 coffees, get 1 free!',
      currentStamps: 7,
      totalStamps: 10,
      rewards: '2 Rewards Available',
      icon: '☕',
      color: '#4F46E5',
    },
    {
      id: '2',
      title: 'Pizza Lover Card',
      subtitle: 'Buy 10 pizzas, get 1 free!',
      currentStamps: 4,
      totalStamps: 10,
      rewards: '1 Reward Available',
      icon: '🍕',
      color: '#F59E0B',
    },
    {
      id: '3',
      title: 'Sandwich Card',
      subtitle: 'Buy 8 sandwiches, get 1 free!',
      currentStamps: 3,
      totalStamps: 8,
      rewards: '1 Reward Available',
      icon: '🥪',
      color: '#10B981',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Stamp Cards</Text>
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
      >
        {cards.map(card => (
          <View key={card.id} style={styles.cardWrapper}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
              </View>
              <Text style={styles.menuDots}>•••</Text>
            </View>

            {/* Stamp Dots Visual */}
            <View style={styles.stampDotsRow}>
              {Array.from({ length: card.totalStamps }).map((_, i) => {
                const filled = i < card.currentStamps;
                return (
                  <View
                    key={i}
                    style={[
                      styles.stampCircle,
                      filled && { backgroundColor: card.color },
                    ]}
                  >
                    <Text style={styles.stampCircleText}>
                      {filled ? card.icon : ''}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.progressText}>
                {card.currentStamps}/{card.totalStamps} Stamps
              </Text>
              <Text style={styles.rewardText}>{card.rewards}</Text>
            </View>
          </View>
        ))}
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
    backgroundColor: '#4F46E5',
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
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  menuDots: {
    fontSize: 16,
    color: '#94A3B8',
    letterSpacing: 2,
  },
  stampDotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 12,
  },
  stampCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampCircleText: {
    fontSize: 13,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#F8FAFC',
  },
  progressText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  rewardText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
  },
});
