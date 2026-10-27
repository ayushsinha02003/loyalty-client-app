import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface RewardItem {
  id: string;
  name: string;
  stamps: number;
  emoji: string;
  emojiBg: string;
  active: boolean;
}

interface AdminRewardsScreenProps {
  onAddReward?: () => void;
}

export default function AdminRewardsScreen({
  onAddReward,
}: AdminRewardsScreenProps) {
  const [rewards, setRewards] = useState<RewardItem[]>([
    {
      id: '1',
      name: 'Free Coffee',
      stamps: 100,
      emoji: '☕',
      emojiBg: '#FEF3C7',
      active: true,
    },
    {
      id: '2',
      name: '20% Off',
      stamps: 200,
      emoji: '🏷️',
      emojiBg: '#FFEDD5',
      active: true,
    },
    {
      id: '3',
      name: 'Free Pastry',
      stamps: 150,
      emoji: '🥐',
      emojiBg: '#EDE9FE',
      active: true,
    },
    {
      id: '4',
      name: 'Buy 1 Get 1 Free',
      stamps: 250,
      emoji: '🍹',
      emojiBg: '#FCE7F3',
      active: true,
    },
  ]);

  const toggleReward = (id: string) => {
    setRewards(prev =>
      prev.map(r => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Rewards</Text>
        <TouchableOpacity
          onPress={onAddReward}
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
        {rewards.map(reward => (
          <View key={reward.id} style={styles.rewardCard}>
            <View style={[styles.iconCircle, { backgroundColor: reward.emojiBg }]}>
              <Text style={styles.rewardEmoji}>{reward.emoji}</Text>
            </View>

            <View style={styles.rewardInfo}>
              <Text style={styles.rewardName}>{reward.name}</Text>
              <Text style={styles.rewardStamps}>{reward.stamps} Stamps</Text>
            </View>

            <Switch
              trackColor={{ false: '#CBD5E1', true: '#86EFAC' }}
              thumbColor={reward.active ? '#16A34A' : '#F1F5F9'}
              value={reward.active}
              onValueChange={() => toggleReward(reward.id)}
            />
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
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rewardEmoji: {
    fontSize: 24,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  rewardStamps: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
});
