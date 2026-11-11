import React, { useEffect } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles } from 'lucide-react-native';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={PALETTE.surfaceContrast}
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.sparkleTopLeft}>
          <Sparkles size={20} strokeWidth={2} color={PALETTE.primary} />
        </View>
        <View style={styles.sparkleTopRight}>
          <Sparkles size={16} strokeWidth={2} color={PALETTE.warning} />
        </View>
        <View style={styles.sparkleBottomLeft}>
          <Sparkles size={18} strokeWidth={2} color={PALETTE.primary} />
        </View>

        <View style={styles.center}>
          <View style={styles.logoFrame}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>LoyaltyApp</Text>

          <View style={styles.taglinePill}>
            <Text style={styles.subtitle}>Collect Stamps, Earn Rewards</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceContrast,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoFrame: {
    width: 148,
    height: 148,
    borderRadius: RADII.xl,
    backgroundColor: PALETTE.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    ...SHADOWS.softCard,
  },
  logo: {
    width: 118,
    height: 118,
    borderRadius: RADII.lg,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    fontSize: 34,
    color: PALETTE.surface,
  },
  taglinePill: {
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: RADII.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  subtitle: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceMuted,
  },
  sparkleTopLeft: {
    position: 'absolute',
    top: 110,
    left: 48,
    opacity: 0.9,
  },
  sparkleTopRight: {
    position: 'absolute',
    top: 190,
    right: 54,
    opacity: 0.85,
  },
  sparkleBottomLeft: {
    position: 'absolute',
    bottom: 130,
    left: 60,
    opacity: 0.75,
  },
});
