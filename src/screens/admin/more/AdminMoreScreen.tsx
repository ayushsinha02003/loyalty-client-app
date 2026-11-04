import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { clearAuthData } from '../../../services/authService';

interface AdminMoreScreenProps {
  onSelectOption?: (option: string) => void;
  onLogout?: () => void;
}

export default function AdminMoreScreen({
  onSelectOption,
  onLogout,
}: AdminMoreScreenProps) {
  const menuItems = [
    { id: 'profile', label: 'Business Profile', emoji: '🏢' },
    { id: 'customers', label: 'Customer Management', emoji: '👥' },
    { id: 'qr', label: 'Business QR Code', emoji: '📱' },
    { id: 'analytics', label: 'Analytics & Insights', emoji: '📊' },
    { id: 'activity', label: 'All Transactions & Activity', emoji: '📋' },
    { id: 'stamps', label: 'Manage Stamp Cards', emoji: '🎫' },
    { id: 'rewards', label: 'Manage Rewards', emoji: '🎁' },
  ];

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out of your business account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          clearAuthData();
          onLogout?.();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>More</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuRow}
            onPress={() => onSelectOption?.(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.leftRow}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconEmoji}>{item.emoji}</Text>
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>

            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Logout Row */}
        <TouchableOpacity
          style={[styles.menuRow, styles.logoutRow]}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <View style={styles.leftRow}>
            <View style={[styles.iconCircle, styles.logoutIconCircle]}>
              <Text style={styles.logoutEmoji}>🚪</Text>
            </View>
            <Text style={styles.logoutLabel}>Logout</Text>
          </View>
        </TouchableOpacity>
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
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconEmoji: {
    fontSize: 18,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  arrowIcon: {
    fontSize: 22,
    color: '#CBD5E1',
    fontWeight: '300',
  },
  logoutRow: {
    marginTop: 14,
    borderBottomWidth: 0,
  },
  logoutIconCircle: {
    backgroundColor: '#FEF2F2',
  },
  logoutEmoji: {
    fontSize: 18,
  },
  logoutLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#DC2626',
  },
});
