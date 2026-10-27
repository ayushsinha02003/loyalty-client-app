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

interface AdminActivityItem {
  id: string;
  name: string;
  action: string;
  amount: string;
  isPositive: boolean;
  time: string;
  avatarBg: string;
}

export default function AdminActivityScreen() {
  const [filter, setFilter] = useState<'All' | 'Stamps' | 'Rewards'>('All');

  const items: AdminActivityItem[] = [
    {
      id: '1',
      name: 'John Doe',
      action: 'Stamp Collected',
      amount: '+1',
      isPositive: true,
      time: '10:30 AM',
      avatarBg: '#EEF2FF',
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      action: 'Stamp Collected',
      amount: '+1',
      isPositive: true,
      time: '10:15 AM',
      avatarBg: '#FEF3C7',
    },
    {
      id: '3',
      name: 'Mike Brown',
      action: 'Reward Redeemed (Free Coffee)',
      amount: '-100',
      isPositive: false,
      time: '09:30 AM',
      avatarBg: '#FCE7F3',
    },
    {
      id: '4',
      name: 'Emily Davis',
      action: 'Stamp Collected',
      amount: '+1',
      isPositive: true,
      time: '09:10 AM',
      avatarBg: '#EDE9FE',
    },
    {
      id: '5',
      name: 'David Lee',
      action: 'Reward Redeemed (Free Pastry)',
      amount: '-150',
      isPositive: false,
      time: '08:45 AM',
      avatarBg: '#E0F2FE',
    },
  ];

  const filtered = items.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Stamps') return item.isPositive;
    if (filter === 'Rewards') return !item.isPositive;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>All Activity</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(['All', 'Stamps', 'Rewards'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterPill, filter === tab && styles.filterPillActive]}
            onPress={() => setFilter(tab)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterText,
                filter === tab && styles.filterTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map(item => (
          <View key={item.id} style={styles.activityCard}>
            <View
              style={[styles.avatarCircle, { backgroundColor: item.avatarBg }]}
            >
              <Text style={styles.avatarInitial}>{item.name.charAt(0)}</Text>
            </View>

            <View style={styles.itemInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.action}>{item.action}</Text>
            </View>

            <View style={styles.rightCol}>
              <Text
                style={[
                  styles.amount,
                  item.isPositive ? styles.amountPositive : styles.amountNegative,
                ]}
              >
                {item.amount}
              </Text>
              <Text style={styles.time}>{item.time}</Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterPillActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
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
    paddingBottom: 100,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
  },
  itemInfo: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 3,
  },
  action: {
    fontSize: 13,
    color: '#64748B',
  },
  rightCol: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 3,
  },
  amountPositive: {
    color: '#16A34A',
  },
  amountNegative: {
    color: '#DC2626',
  },
  time: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
