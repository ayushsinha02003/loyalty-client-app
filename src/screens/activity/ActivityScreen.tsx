import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ActivityItem {
  id: string;
  type: 'stamp' | 'reward';
  title: string;
  store: string;
  amount: string;
  isPositive: boolean;
  time: string;
  icon: string;
  iconBg: string;
}

interface ActivityGroup {
  date: string;
  items: ActivityItem[];
}

interface ActivityScreenProps {
  onBack?: () => void;
}

export default function ActivityScreen({ onBack }: ActivityScreenProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Stamps' | 'Rewards' | 'Offers'>('All');

  const filterOptions: Array<'All' | 'Stamps' | 'Rewards' | 'Offers'> = [
    'All',
    'Stamps',
    'Rewards',
    'Offers',
  ];

  const activities: ActivityGroup[] = [
    {
      date: 'Today',
      items: [
        {
          id: '1',
          type: 'stamp',
          title: 'Stamp Collected',
          store: 'Brew & Beans',
          amount: '+1',
          isPositive: true,
          time: '10:30 AM',
          icon: '☕',
          iconBg: '#FEF3C7',
        },
      ],
    },
    {
      date: 'Yesterday',
      items: [
        {
          id: '2',
          type: 'stamp',
          title: 'Stamp Collected',
          store: 'Pizza Point',
          amount: '+1',
          isPositive: true,
          time: '04:20 PM',
          icon: '🍕',
          iconBg: '#FFEDD5',
        },
      ],
    },
    {
      date: '2 May 2025',
      items: [
        {
          id: '3',
          type: 'reward',
          title: 'Reward Redeemed',
          store: 'Free Coffee',
          amount: '-100',
          isPositive: false,
          time: '04:15 PM',
          icon: '🎁',
          iconBg: '#FCE7F3',
        },
      ],
    },
    {
      date: '1 May 2025',
      items: [
        {
          id: '4',
          type: 'stamp',
          title: 'Stamp Collected',
          store: 'Sweet Treats',
          amount: '+1',
          isPositive: true,
          time: '11:45 AM',
          icon: '🧁',
          iconBg: '#EDE9FE',
        },
      ],
    },
  ];

  // Filter activities
  const filteredGroups = activities
    .map(group => {
      if (activeFilter === 'All') return group;
      if (activeFilter === 'Stamps') {
        return {
          ...group,
          items: group.items.filter(item => item.type === 'stamp'),
        };
      }
      if (activeFilter === 'Rewards') {
        return {
          ...group,
          items: group.items.filter(item => item.type === 'reward'),
        };
      }
      return { ...group, items: [] };
    })
    .filter(group => group.items.length > 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.headerButton}
          activeOpacity={0.7}
        >
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Activity</Text>

        <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
          <Text style={styles.headerIcon}>⚡</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Pills */}
      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filterOptions.map(option => {
            const isActive = activeFilter === option;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.filterPill, isActive && styles.filterPillActive]}
                onPress={() => setActiveFilter(option)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Activity Group List */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredGroups.map(group => (
          <View key={group.date} style={styles.dateGroup}>
            <Text style={styles.dateHeader}>{group.date}</Text>

            {group.items.map(item => (
              <View key={item.id} style={styles.activityCard}>
                <View style={styles.leftRow}>
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: item.iconBg },
                    ]}
                  >
                    <Text style={styles.itemEmoji}>{item.icon}</Text>
                  </View>

                  <View style={styles.infoCol}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemStore}>{item.store}</Text>
                  </View>
                </View>

                <View style={styles.rightCol}>
                  <Text
                    style={[
                      styles.amountText,
                      item.isPositive ? styles.amountPositive : styles.amountNegative,
                    ]}
                  >
                    {item.amount}
                  </Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>
            ))}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 20,
    color: '#1E293B',
    fontWeight: '600',
  },
  filtersWrapper: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterPillActive: {
    backgroundColor: '#7B3FF2',
    borderColor: '#7B3FF2',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#F8FAFC',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  itemEmoji: {
    fontSize: 20,
  },
  infoCol: {
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 3,
  },
  itemStore: {
    fontSize: 13,
    color: '#64748B',
  },
  rightCol: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 3,
  },
  amountPositive: {
    color: '#10B981',
  },
  amountNegative: {
    color: '#EF4444',
  },
  timeText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
