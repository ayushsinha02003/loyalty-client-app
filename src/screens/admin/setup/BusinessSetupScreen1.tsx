import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { PrimaryButton, PrimaryInputField } from '../../../components';
import {
  PALETTE,
  RADII,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from '../../../constants/theme';

interface BusinessSetupScreen1Props {
  onBack?: () => void;
  onNext?: (data: {
    businessName: string;
    category: string;
    address: string;
    city: string;
  }) => void;
}

export default function BusinessSetupScreen1({
  onBack,
  onNext,
}: BusinessSetupScreen1Props) {
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const handleNext = () => {
    onNext?.({
      businessName: businessName || 'Brew & Beans',
      category: category || 'Coffee Shop',
      address: address || '123, MG Road',
      city: city || 'Indore',
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.8}
            style={styles.backButton}
            accessibilityLabel="Go back"
          >
            <ArrowLeft
              size={20}
              color={PALETTE.onSurface}
              strokeWidth={2}
            />
          </TouchableOpacity>

          <View style={styles.stepper}>
            <View style={[styles.stepPill, styles.stepActive]} />
            <View style={styles.stepLine} />
            <View style={styles.stepDot} />
            <View style={styles.stepLine} />
            <View style={styles.stepDot} />
          </View>

          <View style={styles.topSpacer} />
        </View>

        <View style={styles.headerBlock}>
          <Text style={styles.eyebrow}>STEP 1 OF 3</Text>
          <Text style={styles.title}>Business Details</Text>
          <Text style={styles.subtitle}>
            Share your store name and location so customers can recognize your
            loyalty cards.
          </Text>
        </View>

        <View style={styles.formCard}>
          <PrimaryInputField
            label="Business Name"
            placeholder="Brew & Beans"
            value={businessName}
            onChangeText={setBusinessName}
          />
          <PrimaryInputField
            label="Business Category"
            placeholder="Coffee Shop"
            value={category}
            onChangeText={setCategory}
          />
          <PrimaryInputField
            label="Business Address"
            placeholder="123, MG Road"
            value={address}
            onChangeText={setAddress}
          />
          <PrimaryInputField
            label="City"
            placeholder="Indore"
            value={city}
            onChangeText={setCity}
            containerStyle={styles.lastInput}
          />
        </View>

        <View style={styles.footer}>
          <PrimaryButton title="Next" onPress={handleNext} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.gutter,
    paddingTop: 20,
    paddingBottom: 36,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.softCard,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepPill: {
    width: 24,
    height: 8,
    borderRadius: RADII.full,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.border,
  },
  stepActive: {
    backgroundColor: PALETTE.primary,
  },
  stepLine: {
    width: 20,
    height: 2,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.border,
    marginHorizontal: 6,
  },
  topSpacer: {
    width: 44,
  },
  headerBlock: {
    marginBottom: 24,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.primary,
    marginBottom: 8,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    marginBottom: 8,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
  },
  formCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: SPACING.lg,
    marginBottom: 24,
    ...SHADOWS.softCard,
  },
  lastInput: {
    marginBottom: 0,
  },
  footer: {
    marginTop: 'auto',
  },
});
