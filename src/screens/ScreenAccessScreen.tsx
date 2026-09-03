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
  | 'Login'
  | 'Signup';

export const SCREEN_OPTIONS: Array<{ id: ScreenId; label: string }> = [
  { id: 'Home', label: 'Home Screen' },
  { id: 'MyCards', label: 'My Cards Screen' },
  { id: 'Rewards', label: 'Rewards Screen' },
  { id: 'Profile', label: 'Profile Screen' },
  { id: 'AdminHome', label: 'Admin Dashboard' },
  { id: 'Splash', label: 'Splash Screen' },
  { id: 'Onboarding', label: 'Onboarding Screen' },
  { id: 'Login', label: 'Login Screen' },
  { id: 'Signup', label: 'SignUp Screen' },
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
    paddingBottom: 20,
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
