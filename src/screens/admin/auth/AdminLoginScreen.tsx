import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import PrimaryButton from '../../../components/button/PrimaryButton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

interface AdminLoginScreenProps {
  onBack?: () => void;
  onLogin?: () => void;
  onSignUp?: () => void;
}

export default function AdminLoginScreen({
  onBack,
  onLogin,
  onSignUp,
}: AdminLoginScreenProps) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButton}
              activeOpacity={0.75}
              accessibilityLabel="Back"
            >
              <ArrowLeft size={20} strokeWidth={2} color={PALETTE.onSurface} />
            </TouchableOpacity>
          </View>

          <View style={styles.titleSection}>
            <Text style={styles.eyebrow}>Merchant Portal</Text>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to your business account</Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+91 98765 43210"
                placeholderTextColor={PALETTE.onSurfaceMuted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter password"
                  placeholderTextColor={PALETTE.onSurfaceMuted}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                  style={styles.toggleBtn}
                >
                  {showPassword ? (
                    <EyeOff
                      size={20}
                      strokeWidth={2}
                      color={PALETTE.onSurfaceVariant}
                    />
                  ) : (
                    <Eye
                      size={20}
                      strokeWidth={2}
                      color={PALETTE.onSurfaceVariant}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <PrimaryButton title="Login" onPress={onLogin || (() => {})} />
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.75}>
              <Text style={styles.socialLabel}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.75}>
              <Text style={styles.socialLabel}>Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={onSignUp}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  header: {
    paddingVertical: 14,
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
  titleSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.primary,
    marginBottom: 6,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.onSurface,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
    marginTop: 6,
  },
  formCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 20,
    ...SHADOWS.softCard,
  },
  inputGroup: {
    marginBottom: 16,
    gap: 8,
  },
  label: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginLeft: 4,
  },
  input: {
    height: 52,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surfaceAlt,
    borderWidth: 1,
    borderColor: PALETTE.border,
    paddingHorizontal: 20,
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surfaceAlt,
    borderWidth: 1,
    borderColor: PALETTE.border,
    paddingLeft: 20,
    paddingRight: 12,
  },
  passwordInput: {
    flex: 1,
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
  },
  toggleBtn: {
    padding: 6,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.primary,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: PALETTE.border,
  },
  dividerText: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceMuted,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 50,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.softCard,
  },
  socialLabel: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 14,
    color: PALETTE.onSurface,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
  },
  signUpLink: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 14,
    color: PALETTE.primary,
  },
});
