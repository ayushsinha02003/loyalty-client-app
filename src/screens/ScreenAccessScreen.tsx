import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { TabId } from '../components/common/BottomNav';

export type ScreenId =
  | TabId
  | 'Splash'
  | 'Onboarding'
  | 'Welcome'
  | 'Login'
  | 'Signup'
  | 'Otp'
  | 'Home'
  | 'MyCards'
  | 'Search'
  | 'QrScanner'
  | 'ScanSuccess'
  | 'Rewards'
  | 'RewardDetails'
  | 'Activity'
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

export const SCREEN_OPTIONS: Array<{ id: ScreenId; label: string; section?: string }> = [
  // Customer Screens
  { id: 'Splash', label: '1. Splash Screen', section: 'CUSTOMER' },
  { id: 'Onboarding', label: '2-4. Onboarding Screens' },
  { id: 'Welcome', label: '5. Welcome Screen' },
  { id: 'Login', label: '6. Sign In Screen' },
  { id: 'Signup', label: '7. Sign Up Screen' },
  { id: 'Home', label: '8. Home Screen' },
  { id: 'MyCards', label: '9. My Cards Screen' },
  { id: 'Search', label: '10. Discover & Search Screen' },
  { id: 'QrScanner', label: '11. QR Scanner Screen' },
  { id: 'ScanSuccess', label: '12. Scan Success Screen' },
  { id: 'Rewards', label: '13. Rewards Screen' },
  { id: 'Activity', label: '14. Activity History Screen' },
  { id: 'Profile', label: '15. Profile Screen' },

  // Admin Screens
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
    <View style={styles.container}>
      <Text style={styles.title}>Explore Screens</Text>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {SCREEN_OPTIONS.map(screen => (
          <React.Fragment key={screen.id}>
            {screen.section ? (
              <Text style={styles.sectionHeading}>
                {screen.section === 'CUSTOMER' ? '👤 CUSTOMER EXPERIENCE' : '💼 BUSINESS OWNER EXPERIENCE'}
              </Text>
            ) : null}
            <TouchableOpacity
              style={[
                styles.button,
                (screen.id.startsWith('Admin') || screen.id.startsWith('Business')) &&
                  styles.adminButton,
              ]}
              onPress={() => onSelectScreen(screen.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>{screen.label}</Text>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: 52,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: '#7B3FF2',
    marginTop: 20,
    marginBottom: 8,
    letterSpacing: 1,
  },
  list: {
    gap: 12,
    paddingBottom: 120,
  },
  button: {
    backgroundColor: '#7B3FF2',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminButton: {
    backgroundColor: '#4C1D95',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
