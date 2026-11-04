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
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { clearAuthData } from '../../../services/authService';

interface AdminMoreScreenProps {
  onSelectOption?: (option: string) => void;
  onLogout?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentProps<typeof MaterialDesignIcons>['name'];
  iconColor: string;
  iconBg: string;
}

export default function AdminMoreScreen({
  onSelectOption,
  onLogout,
}: AdminMoreScreenProps) {
  const menuItems: MenuItem[] = [
    {
      id: 'profile',
      label: 'Business Profile',
      icon: 'storefront-outline',
      iconColor: '#7C3AED',
      iconBg: '#F3E8FF',
    },
    {
      id: 'customers',
      label: 'Customer Management',
      icon: 'account-group-outline',
      iconColor: '#2563EB',
      iconBg: '#DBEAFE',
    },
    {
      id: 'qr',
      label: 'Business QR Code',
      icon: 'qrcode-scan',
      iconColor: '#059669',
      iconBg: '#D1FAE5',
    },
    {
      id: 'analytics',
      label: 'Analytics & Insights',
      icon: 'chart-bar',
      iconColor: '#D97706',
      iconBg: '#FEF3C7',
    },
    {
      id: 'activity',
      label: 'All Transactions & Activity',
      icon: 'history',
      iconColor: '#4F46E5',
      iconBg: '#EEF2FF',
    },
    {
      id: 'stamps',
      label: 'Manage Stamp Cards',
      icon: 'ticket-percent-outline',
      iconColor: '#0891B2',
      iconBg: '#CFFAFE',
    },
    {
      id: 'rewards',
      label: 'Manage Rewards',
      icon: 'gift-outline',
      iconColor: '#E11D48',
      iconBg: '#FFE4E6',
    },
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
              <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
                <MaterialDesignIcons
                  name={item.icon}
                  size={22}
                  color={item.iconColor}
                />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>

            <MaterialDesignIcons name="chevron-right" size={22} color="#94A3B8" />
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
              <MaterialDesignIcons name="logout" size={20} color="#DC2626" />
            </View>
            <Text style={styles.logoutLabel}>Logout</Text>
          </View>
          <MaterialDesignIcons name="chevron-right" size={22} color="#DC2626" />
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
