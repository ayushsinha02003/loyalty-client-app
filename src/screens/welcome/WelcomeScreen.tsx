import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import PrimaryButton from '../../components/button/PrimaryButton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

interface WelcomeScreenProps {
  onCreateAccount?: () => void;
  onSignIn?: () => void;
}

export default function WelcomeScreen({
  onCreateAccount,
  onSignIn,
}: WelcomeScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <View style={styles.content}>
        {/* Gift Box Illustration */}
        <View style={styles.illustrationCard}>
          <Svg width={210} height={210} viewBox="0 0 200 200">
            <Circle cx="100" cy="180" r="46" fill={PALETTE.illusCoralBg} />

            {/* Gift Box Base */}
            <Rect
              x="45"
              y="85"
              width="110"
              height="90"
              rx="18"
              fill={PALETTE.primaryPressed}
            />
            <Rect
              x="50"
              y="90"
              width="100"
              height="80"
              rx="14"
              fill={PALETTE.primary}
            />

            {/* Vertical Ribbon */}
            <Rect x="90" y="85" width="20" height="90" fill={PALETTE.illusWarmYellow} />

            {/* Gift Box Lid */}
            <Rect
              x="40"
              y="68"
              width="120"
              height="24"
              rx="8"
              fill={PALETTE.surfaceContrast}
            />
            <Rect x="90" y="68" width="20" height="24" fill={PALETTE.illusWarmYellow} />

            {/* Ribbon Bow */}
            <Path
              d="M100 68 C80 40 55 45 65 62 C72 74 95 68 100 68 Z"
              fill={PALETTE.illusWarmYellow}
            />
            <Path
              d="M100 68 C120 40 145 45 135 62 C128 74 105 68 100 68 Z"
              fill={PALETTE.illusWarmYellow}
            />
            <Circle cx="100" cy="68" r="8" fill={PALETTE.illusWarmOrange} />

            {/* Friendly Mascot Eyes */}
            <Circle cx="80" cy="125" r="4.5" fill={PALETTE.surface} />
            <Circle cx="120" cy="125" r="4.5" fill={PALETTE.surface} />
            <Circle cx="81.5" cy="124" r="2" fill={PALETTE.surfaceContrast} />
            <Circle cx="121.5" cy="124" r="2" fill={PALETTE.surfaceContrast} />

            {/* Rosy Cheeks */}
            <Circle cx="73" cy="133" r="4.5" fill={PALETTE.illusCoralBg} opacity="0.85" />
            <Circle cx="127" cy="133" r="4.5" fill={PALETTE.illusCoralBg} opacity="0.85" />

            {/* Smile */}
            <Path
              d="M93 133 Q100 141 107 133"
              stroke={PALETTE.surface}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Floating Sparkles */}
            <Circle cx="35" cy="65" r="3" fill={PALETTE.primary} opacity="0.7" />
            <Circle cx="165" cy="75" r="4" fill={PALETTE.warning} opacity="0.85" />
            <Circle cx="155" cy="140" r="2.5" fill={PALETTE.surfaceContrast} />
          </Svg>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.eyebrow}>Digital Loyalty Wallet</Text>
          <Text style={styles.title}>Welcome to LoyaltyApp</Text>
          <Text style={styles.subtitle}>
            Collect stamps from your favorite local stores and earn exciting rewards.
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <PrimaryButton
            title="Create Account"
            onPress={onCreateAccount || (() => {})}
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
    backgroundColor: PALETTE.surfaceAlt,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 28,
  },
  illustrationCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    paddingVertical: 28,
    marginTop: 12,
    ...SHADOWS.softCard,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.primary,
    marginBottom: 8,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.onSurface,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  actionContainer: {
    width: '100%',
    paddingBottom: 8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  footerText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
  },
  signInLink: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 14,
    color: PALETTE.primary,
  },
});
