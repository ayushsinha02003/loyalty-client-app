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
  | 'AdminHome'
  | 'Splash'
  | 'Onboarding'
  | 'Welcome'
  | 'Login'
  | 'Signup'
  | 'Otp'
  | 'QrScanner'
  | 'ScanSuccess'
  | 'RewardDetails'
  | 'Activity';

export const SCREEN_OPTIONS: Array<{ id: ScreenId; label: string }> = [
  { id: 'Splash', label: '1. Splash Screen' },
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
  { id: 'AdminHome', label: 'Admin Dashboard' },
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
          <TouchableOpacity
            key={screen.id}
            style={styles.button}
            onPress={() => onSelectScreen(screen.id)}
          >
            <Text style={styles.buttonText}>{screen.label}</Text>
          </TouchableOpacity>
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
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  list: {
    gap: 12,
    paddingBottom: 120,
  },
  button: {
    backgroundColor: '#7C3AED',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
