import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryText from '../../components/text/PrimaryText';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

interface OnboardingItem {
  id: number;
  title: string;
  highlight: string;
  description: string;
  image: ImageSourcePropType;
}

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

const ONBOARDING_DATA: OnboardingItem[] = [
  {
    id: 1,
    title: 'Collect Stamps.',
    highlight: 'Earn Rewards.',
    description:
      'Visit your favorite places, collect stamps and enjoy exclusive perks.',
    image: require('../../assets/images/onboarding/onboarding-1.png'),
  },
  {
    id: 2,
    title: 'Collect Stamps',
    highlight: 'Every Visit.',
    description:
      'Scan QR at the counter to collect stamps seamlessly on your digital cards.',
    image: require('../../assets/images/onboarding/onboarding-2.png'),
  },
  {
    id: 3,
    title: 'Unlock Rewards',
    highlight: "You'll Love.",
    description:
      'Redeem exciting gifts and special offers across local partner stores.',
    image: require('../../assets/images/onboarding/onboarding-3.png'),
  },
];

const OnboardingScreen = ({ onGetStarted }: OnboardingScreenProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const currentItem = ONBOARDING_DATA[currentPage];

  const handleNext = () => {
    if (currentPage < ONBOARDING_DATA.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onGetStarted();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <View style={styles.textSection}>
        <PrimaryText text={currentItem.title} customStyle={styles.title} />
        <PrimaryText
          text={currentItem.highlight}
          customStyle={styles.highlight}
        />
        <PrimaryText
          text={currentItem.description}
          customStyle={styles.description}
        />
      </View>

      <View style={styles.stageContainer}>
        <View style={styles.imageStageCard}>
          <Image
            key={currentPage}
            source={currentItem.image}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </View>

      <View style={styles.indicatorContainer}>
        {ONBOARDING_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentPage === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>

      <View style={styles.bottomSection}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleNext}
        >
          <PrimaryText
            text={
              currentPage === ONBOARDING_DATA.length - 1
                ? 'Get Started'
                : 'Next'
            }
            customStyle={styles.buttonText}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  textSection: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.onSurface,
    textAlign: 'center',
  },
  highlight: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.primary,
    textAlign: 'center',
  },
  description: {
    marginTop: 14,
    maxWidth: 310,
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
    textAlign: 'center',
  },
  stageContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  imageStageCard: {
    flex: 1,
    width: '100%',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.softCard,
  },
  image: {
    width: '92%',
    height: '92%',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 22,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusNeutralCream,
  },
  activeIndicator: {
    width: 24,
    backgroundColor: PALETTE.primary,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  button: {
    height: 56,
    borderRadius: RADII.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PALETTE.primary,
    ...SHADOWS.btn,
  },
  buttonPressed: {
    backgroundColor: PALETTE.primaryPressed,
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onPrimary,
  },
});
