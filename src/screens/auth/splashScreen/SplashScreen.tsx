import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { COLORS } from '../../../constants/colors';

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
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <SafeAreaView style={styles.container}>
        {/* Decorative Stars */}
        <Text style={styles.star1}>✦</Text>
        <Text style={styles.star2}>✦</Text>
        <Text style={styles.star3}>✦</Text>

        {/* Center */}
        <View style={styles.center}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>LoyaltyApp</Text>

          <Text style={styles.subtitle}>Collect Stamps, Earn Rewards</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 150,
    height: 150,
    borderRadius: 40,
    marginBottom: 25,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.background,
  },
  star1: {
    position: 'absolute',
    top: 120,
    left: 60,
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.8,
  },

  star2: {
    position: 'absolute',
    top: 200,
    right: 70,
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },

  star3: {
    position: 'absolute',
    top: 260,
    left: 90,
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
});
