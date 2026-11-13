import React from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BarChart3,
  ChevronRight,
  FileText,
  Gift,
  History,
  LogOut,
  QrCode,
  Shield,
  Store,
  Ticket,
  Trash2,
  Users,
} from 'lucide-react-native';
import { clearAuthData, deleteUserAccount } from '../../../services/authService';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

interface AdminMoreScreenProps {
  onSelectOption?: (option: string) => void;
  onLogout?: () => void;
}

const MENU_ITEMS = [
  { id: 'profile', label: 'Business Profile', Icon: Store },
  { id: 'customers', label: 'Customer Management', Icon: Users },
  { id: 'qr', label: 'Business QR Code', Icon: QrCode },
  { id: 'analytics', label: 'Analytics & Insights', Icon: BarChart3 },
  { id: 'activity', label: 'Transactions & Activity', Icon: History },
  { id: 'stamps', label: 'Manage Stamp Cards', Icon: Ticket },
  { id: 'rewards', label: 'Manage Rewards', Icon: Gift },
  { id: 'terms', label: 'Terms of Service', Icon: FileText },
  { id: 'privacy', label: 'Privacy Policy', Icon: Shield },
] as const;

export default function AdminMoreScreen({
  onSelectOption,
  onLogout,
}: AdminMoreScreenProps) {
  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to log out of your business account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await clearAuthData();
            onLogout?.();
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Business Account',
      'This will permanently delete your business, all stamp cards, issued rewards, and QR codes. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Permanently',
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await deleteUserAccount();
              if (res.success) {
                Alert.alert('Account Deleted', 'Your business account has been deleted.');
                onLogout?.();
              } else {
                Alert.alert('Error', res.message || 'Failed to delete account.');
              }
            } catch (err: any) {
              Alert.alert('Error', err?.message || 'Could not connect to server.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <View style={styles.header}>
        <Text style={styles.eyebrow}>Workspace</Text>
        <Text style={styles.title}>More</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {MENU_ITEMS.map(({ id, label, Icon }) => (
          <TouchableOpacity
            key={id}
            style={styles.menuRow}
            onPress={() => onSelectOption?.(id)}
            activeOpacity={0.8}
          >
            <View style={styles.leftRow}>
              <View style={styles.iconCircle}>
                <Icon size={20} strokeWidth={2} color={PALETTE.onSurface} />
              </View>
              <Text style={styles.menuLabel}>{label}</Text>
            </View>

            <ChevronRight
              size={20}
              strokeWidth={2}
              color={PALETTE.onSurfaceMuted}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.menuRow, styles.logoutRow]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <View style={styles.leftRow}>
            <View style={[styles.iconCircle, styles.logoutIconCircle]}>
              <LogOut size={20} strokeWidth={2} color={PALETTE.primary} />
            </View>
            <Text style={styles.logoutLabel}>Sign Out</Text>
          </View>
          <ChevronRight size={20} strokeWidth={2} color={PALETTE.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuRow, styles.deleteRow]}
          onPress={handleDeleteAccount}
          activeOpacity={0.8}
        >
          <View style={styles.leftRow}>
            <View style={[styles.iconCircle, styles.deleteIconCircle]}>
              <Trash2 size={20} strokeWidth={2} color="#DC2626" />
            </View>
            <Text style={styles.deleteLabel}>Delete Business Account</Text>
          </View>
          <ChevronRight size={20} strokeWidth={2} color="#DC2626" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 14,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 4,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.onSurface,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    gap: 10,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 16,
    ...SHADOWS.softCard,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    ...TYPOGRAPHY.labelMd,
    fontSize: 15,
    color: PALETTE.onSurface,
  },
  logoutRow: {
    marginTop: 8,
  },
  logoutIconCircle: {
    backgroundColor: PALETTE.illusCoralBg,
  },
  logoutLabel: {
    ...TYPOGRAPHY.labelMd,
    fontSize: 15,
    color: PALETTE.primary,
  },
  deleteRow: {
    marginTop: 8,
    borderColor: '#FEE2E2',
  },
  deleteIconCircle: {
    backgroundColor: '#FEF2F2',
  },
  deleteLabel: {
    ...TYPOGRAPHY.labelMd,
    fontSize: 15,
    color: '#DC2626',
  },
});
