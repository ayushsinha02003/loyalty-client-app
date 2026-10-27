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
} from 'react-native';

interface Customer {
  id: string;
  name: string;
  phone: string;
  totalStamps: number;
  avatarColor: string;
}

export default function AdminCustomersScreen() {
  const [search, setSearch] = useState('');

  const customers: Customer[] = [
    {
      id: '1',
      name: 'John Doe',
      phone: '+91  98765 43210',
      totalStamps: 32,
      avatarColor: '#EEF2FF',
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      phone: '+91  98765 43211',
      totalStamps: 28,
      avatarColor: '#FEF3C7',
    },
    {
      id: '3',
      name: 'Mike Brown',
      phone: '+91  98765 43212',
      totalStamps: 15,
      avatarColor: '#FCE7F3',
    },
    {
      id: '4',
      name: 'Emily Davis',
      phone: '+91  98765 43213',
      totalStamps: 12,
      avatarColor: '#EDE9FE',
    },
    {
      id: '5',
      name: 'David Lee',
      phone: '+91  98765 43214',
      totalStamps: 8,
      avatarColor: '#E0F2FE',
    },
  ];

  const filtered = customers.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Customers</Text>
      </View>

      {/* Search Bar Row */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search customers..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Customers List */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map(customer => (
          <TouchableOpacity
            key={customer.id}
            style={styles.customerCard}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.avatarCircle,
                { backgroundColor: customer.avatarColor },
              ]}
            >
              <Text style={styles.avatarInitial}>
                {customer.name.charAt(0)}
              </Text>
            </View>

            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{customer.name}</Text>
              <Text style={styles.customerPhone}>{customer.phone}</Text>
            </View>

            <View style={styles.stampBadge}>
              <Text style={styles.stampLabel}>Total Stamps</Text>
              <Text style={styles.stampValue}>{customer.totalStamps}</Text>
            </View>
          </TouchableOpacity>
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
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    height: 48,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    paddingVertical: 0,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 18,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 3,
  },
  customerPhone: {
    fontSize: 13,
    color: '#64748B',
  },
  stampBadge: {
    alignItems: 'flex-end',
  },
  stampLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 2,
  },
  stampValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#4F46E5',
  },
});
