import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Briefcase, ChevronRight, User } from 'lucide-react-native';
import type { TabId } from '../components/common/BottomNav';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../constants/theme';

export type ScreenId =
  | TabId
  | 'Splash'
  | 'Onboarding'
  | 'Welcome'
  | 'Login'
  | 'Signup'
  | 'ForgotPassword'
  | 'Terms'
  | 'PrivacyPolicy'
  | 'Otp'
  | 'Home'
  | 'MyCards'
  | 'Search'
  | 'QrScanner'
  | 'ScanSuccess'
  | 'Rewards'
  | 'RewardDetails'
  | 'Activity'
  | 'Notifications'
  | 'Profile'
  | 'AdminLogin'
  | 'BusinessSetup1'
  | 'BusinessSetup2'
  | 'BusinessSetup3'
  | 'AdminHome'
  | 'AdminCustomers'
  | 'AdminStampCards'
  | 'AdminAddStampCard'
  | 'AdminRewards'
  | 'AdminAddReward'
  | 'AdminQrCode'
  | 'AdminAnalytics'
  | 'AdminActivity'
  | 'AdminBusinessProfile'
  | 'AdminMore';

export const SCREEN_OPTIONS: Array<{
  id: ScreenId;
  label: string;
  section?: string;
}> = [
  { id: 'Splash', label: '1. Splash Screen', section: 'CUSTOMER' },
  { id: 'Onboarding', label: '2-4. Onboarding Screens' },
  { id: 'Welcome', label: '5. Welcome Screen' },
  { id: 'Login', label: '6. Sign In Screen' },
  { id: 'Signup', label: '7. Sign Up Screen' },
  { id: 'ForgotPassword', label: '7a. Forgot Password Screen' },
  { id: 'Terms', label: '7b. Terms of Service Screen' },
  { id: 'PrivacyPolicy', label: '7c. Privacy Policy Screen' },
  { id: 'Home', label: '8. Home Screen' },
  { id: 'MyCards', label: '9. My Cards Screen' },
  { id: 'Search', label: '10. Discover & Search Screen' },
  { id: 'QrScanner', label: '11. QR Scanner Screen' },
  { id: 'ScanSuccess', label: '12. Scan Success Screen' },
  { id: 'Rewards', label: '13. Rewards Screen' },
  { id: 'Activity', label: '14. Activity History Screen' },
  { id: 'Notifications', label: '14b. Notifications Screen' },
  { id: 'Profile', label: '15. Profile Screen' },
  { id: 'AdminHome', label: '1. Admin Dashboard', section: 'ADMIN' },
  { id: 'AdminCustomers', label: '2. Customers Screen (Manage & Stamp)' },
  { id: 'AdminStampCards', label: '3. Stamp Cards (Manage)' },
  { id: 'AdminAddStampCard', label: '4. Add Stamp Card Screen' },
  { id: 'AdminRewards', label: '5. Admin Rewards Screen' },
  { id: 'AdminAddReward', label: '6. Add Reward Screen' },
  { id: 'AdminQrCode', label: '7. Business QR Code Screen' },
  { id: 'AdminAnalytics', label: '8. Analytics Screen' },
  { id: 'AdminActivity', label: '9. Activity / Transactions' },
  { id: 'AdminBusinessProfile', label: '10. Business Profile Screen' },
  { id: 'AdminMore', label: '11. More / Settings Screen' },
];

type ScreenAccessScreenProps = {
  onSelectScreen: (screen: ScreenId) => void;
};

export default function ScreenAccessScreen({
  onSelectScreen,
}: ScreenAccessScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Directory</Text>
        <Text style={styles.title}>Explore Screens</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {SCREEN_OPTIONS.map(screen => {
          const isAdmin =
            screen.id.startsWith('Admin') || screen.id.startsWith('Business');
          return (
            <React.Fragment key={screen.id}>
              {screen.section ? (
                <View style={styles.sectionHeadingRow}>
                  <View
                    style={[
                      styles.sectionIconCircle,
                      screen.section === 'ADMIN' && styles.sectionIconAdmin,
                    ]}
                  >
                    {screen.section === 'CUSTOMER' ? (
                      <User size={14} strokeWidth={2} color={PALETTE.primary} />
                    ) : (
                      <Briefcase
                        size={14}
                        strokeWidth={2}
                        color={PALETTE.surface}
                      />
                    )}
                  </View>
                  <Text style={styles.sectionHeading}>
                    {screen.section === 'CUSTOMER'
                      ? 'CUSTOMER EXPERIENCE'
                      : 'BUSINESS OWNER EXPERIENCE'}
                  </Text>
                </View>
              ) : null}

              <TouchableOpacity
                style={[styles.button, isAdmin && styles.adminButton]}
                onPress={() => onSelectScreen(screen.id)}
                activeOpacity={0.85}
              >
                <Text
                  style={[styles.buttonText, isAdmin && styles.adminButtonText]}
                >
                  {screen.label}
                </Text>
                <ChevronRight
                  size={18}
                  strokeWidth={2}
                  color={isAdmin ? PALETTE.surface : PALETTE.onSurfaceMuted}
                />
              </TouchableOpacity>
            </React.Fragment>
          );
        })}
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
    paddingBottom: 10,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.primary,
    marginBottom: 4,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.onSurface,
  },
  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 18,
    marginBottom: 6,
  },
  sectionIconCircle: {
    width: 26,
    height: 26,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionIconAdmin: {
    backgroundColor: PALETTE.surfaceContrast,
  },
  sectionHeading: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
  },
  list: {
    paddingHorizontal: 24,
    gap: 10,
    paddingBottom: 120,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.full,
    borderWidth: 1,
    borderColor: PALETTE.border,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOWS.softCard,
  },
  adminButton: {
    backgroundColor: PALETTE.surfaceContrast,
    borderColor: PALETTE.surfaceContrast,
  },
  buttonText: {
    ...TYPOGRAPHY.labelMd,
    fontSize: 15,
    color: PALETTE.onSurface,
  },
  adminButtonText: {
    color: PALETTE.surface,
  },
});
