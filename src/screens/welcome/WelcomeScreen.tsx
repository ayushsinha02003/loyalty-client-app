import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import PrimaryButton from '../../components/button/PrimaryButton';

interface WelcomeScreenProps {
  onCreateAccount?: () => void;
  onSignIn?: () => void;
}

export default function WelcomeScreen({
  onCreateAccount,
  onSignIn,
}: WelcomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        {/* 3D Gift Box Illustration */}
        <View style={styles.illustrationContainer}>
          <Svg width={220} height={220} viewBox="0 0 200 200">
            {/* Soft Shadow */}
            <Circle cx="100" cy="180" r="50" fill="#E9D5FF" opacity="0.6" />

            {/* Gift Box Base */}
            <Rect
              x="45"
              y="85"
              width="110"
              height="90"
              rx="18"
              fill="#8B5CF6"
            />
            {/* Box Front Highlight */}
            <Rect
              x="50"
              y="90"
              width="100"
              height="80"
              rx="14"
              fill="#7C3AED"
            />

            {/* Vertical Ribbon */}
            <Rect x="90" y="85" width="20" height="90" fill="#DDD6FE" />

            {/* Gift Box Lid */}
            <Rect
              x="40"
              y="68"
              width="120"
              height="24"
              rx="8"
              fill="#A78BFA"
            />
            {/* Lid Ribbon */}
            <Rect x="90" y="68" width="20" height="24" fill="#EDE9FE" />

            {/* Ribbon Bow Left */}
            <Path
              d="M100 68 C80 40 55 45 65 62 C72 74 95 68 100 68 Z"
              fill="#C4B5FD"
            />
            {/* Ribbon Bow Right */}
            <Path
              d="M100 68 C120 40 145 45 135 62 C128 74 105 68 100 68 Z"
              fill="#C4B5FD"
            />
            {/* Bow Center Knot */}
            <Circle cx="100" cy="68" r="8" fill="#DDD6FE" />

            {/* Friendly Mascot Eyes */}
            <Circle cx="80" cy="125" r="4.5" fill="#FFFFFF" />
            <Circle cx="120" cy="125" r="4.5" fill="#FFFFFF" />
            <Circle cx="81.5" cy="124" r="2" fill="#1E1B4B" />
            <Circle cx="121.5" cy="124" r="2" fill="#1E1B4B" />

            {/* Rosy Cheeks */}
            <Circle cx="73" cy="133" r="5" fill="#F472B6" opacity="0.7" />
            <Circle cx="127" cy="133" r="5" fill="#F472B6" opacity="0.7" />

            {/* Cute Smile */}
            <Path
              d="M93 133 Q100 141 107 133"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Floating Sparkles */}
            <Circle cx="35" cy="65" r="3" fill="#A78BFA" opacity="0.8" />
            <Circle cx="165" cy="75" r="4" fill="#C4B5FD" opacity="0.8" />
            <Circle cx="155" cy="140" r="2.5" fill="#DDD6FE" />
          </Svg>
        </View>

        {/* Text Section */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to LoyaltyApp</Text>
          <Text style={styles.subtitle}>
            Collect stamps from your favorite stores and earn exciting rewards.
          </Text>
        </View>

        {/* Button Section */}
        <View style={styles.actionContainer}>
          <PrimaryButton
            title="Create Account"
            onPress={onCreateAccount}
          />

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={onSignIn}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'space-between',
    paddingVertical: 36,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  actionContainer: {
    width: '100%',
    paddingBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#6366F1',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#64748B',
    fontSize: 14,
  },
  signInLink: {
    color: '#7B3FF2',
    fontSize: 14,
    fontWeight: '700',
  },
});
