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
import { ArrowLeft, Upload } from 'lucide-react-native';
import { PrimaryButton, PrimaryInputField } from '../../../components';
import {
  PALETTE,
  RADII,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from '../../../constants/theme';

interface BusinessSetupScreen2Props {
  onBack?: () => void;
  onNext?: (data: { contactNumber: string; email: string }) => void;
}

export default function BusinessSetupScreen2({
  onBack,
  onNext,
}: BusinessSetupScreen2Props) {
  const [contactNumber, setContactNumber] = useState('+91  98765 43210');
  const [email, setEmail] = useState('business@email.com');

  const handleNext = () => {
    onNext?.({
      contactNumber,
      email,
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
            <View style={[styles.stepDot, styles.stepActive]} />
            <View style={[styles.stepLine, styles.stepActive]} />
            <View style={[styles.stepPill, styles.stepActive]} />
            <View style={styles.stepLine} />
            <View style={styles.stepDot} />
          </View>

          <View style={styles.topSpacer} />
        </View>

        <View style={styles.headerBlock}>
          <Text style={styles.eyebrow}>STEP 2 OF 3</Text>
          <Text style={styles.title}>Contact & Branding</Text>
          <Text style={styles.subtitle}>
            Add your store logo and contact details so customers can reach you
            easily.
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.85} style={styles.uploadCard}>
          <View style={styles.uploadIconCircle}>
            <Upload size={22} color={PALETTE.primary} strokeWidth={2} />
          </View>
          <Text style={styles.uploadText}>Upload Business Logo</Text>
          <Text style={styles.uploadHint}>PNG or JPG, recommended 512 x 512</Text>
        </TouchableOpacity>

        <View style={styles.formCard}>
          <PrimaryInputField
            label="Contact Number"
            placeholder="+91 98765 43210"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
          />
          <PrimaryInputField
            label="Business Email"
            placeholder="business@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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
  stepLine: {
    width: 20,
    height: 2,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.border,
    marginHorizontal: 6,
  },
  stepActive: {
    backgroundColor: PALETTE.primary,
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
  uploadCard: {
    borderRadius: RADII.xl,
    borderWidth: 1.5,
    borderColor: PALETTE.border,
    borderStyle: 'dashed',
    backgroundColor: PALETTE.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
    ...SHADOWS.softCard,
  },
  uploadIconCircle: {
    width: 52,
    height: 52,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadText: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onSurface,
    marginBottom: 4,
  },
  uploadHint: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceMuted,
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
