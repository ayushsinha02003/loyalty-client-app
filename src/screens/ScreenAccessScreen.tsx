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
  { id: 'Otp', label: '8. OTP Verification' },
  { id: 'Home', label: '9. Home Screen' },
  { id: 'MyCards', label: '10. My Cards Screen' },
  { id: 'QrScanner', label: '11. QR Scanner Screen' },
  { id: 'ScanSuccess', label: '12. Scan Success Screen' },
  { id: 'Rewards', label: '13. Rewards Screen' },
  { id: 'RewardDetails', label: '14. Reward Details Screen' },
  { id: 'Activity', label: '15. Activity Screen' },
  { id: 'Profile', label: '16. Profile Screen' },

  // Admin Screens
  { id: 'BusinessSetup1', label: '1. Business Setup (Step 1)', section: 'ADMIN' },
  { id: 'BusinessSetup2', label: '2. Business Setup (Step 2)' },
  { id: 'BusinessSetup3', label: '3. Review & Confirm (Step 3)' },
  { id: 'AdminHome', label: '4. Admin Dashboard' },
  { id: 'AdminCustomers', label: '5. Customers Screen' },
  { id: 'AdminStampCards', label: '6. Stamp Cards (Manage)' },
  { id: 'AdminAddStampCard', label: '7. Add Stamp Card Screen' },
  { id: 'AdminRewards', label: '8. Admin Rewards Screen' },
  { id: 'AdminAddReward', label: '9. Add Reward Screen' },
  { id: 'AdminQrCode', label: '10. Business QR Code Screen' },
  { id: 'AdminAnalytics', label: '11. Analytics Screen' },
  { id: 'AdminActivity', label: '12. Activity / Transactions' },
  { id: 'AdminBusinessProfile', label: '13. Business Profile Screen' },
  { id: 'AdminMore', label: '14. More / Settings Screen' },
];

type ScreenAccessScreenProps = {
  onSelectScreen: (screen: ScreenId) => void;
};

export default function ScreenAccessScreen({
  onSelectScreen,
}: ScreenAccessScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Open a Screen</Text>

      <ScrollView contentContainerStyle={styles.list}>
        {SCREEN_OPTIONS.map(screen => (
          <React.Fragment key={screen.id}>
            {screen.section ? (
              <Text style={styles.sectionHeading}>
                {screen.section === 'CUSTOMER' ? '👤 CUSTOMER SCREENS' : '💼 ADMIN / BUSINESS SCREENS'}
              </Text>
            ) : null}
            <TouchableOpacity
              style={[
                styles.button,
                (screen.id.startsWith('Admin') || screen.id.startsWith('Business')) &&
                  styles.adminButton,
              ]}
              onPress={() => onSelectScreen(screen.id)}
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
