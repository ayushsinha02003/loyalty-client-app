import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react-native';
import {
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} from '../../../services/authService';
import PrimaryInputField from '../../../components/input/PrimaryInputField';
import PrimaryPasswordField from '../../../components/input/PrimaryPasswordField';
import PrimaryButton from '../../../components/button/PrimaryButton';
import PrimaryErrorBanner from '../../../components/common/PrimaryErrorBanner';
import { PALETTE, RADII, SHADOWS, SPACING, TYPOGRAPHY } from '../../../constants/theme';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

type Step = 'REQUEST' | 'OTP' | 'NEW_PASSWORD' | 'SUCCESS';

export default function ForgotPasswordScreen({
  onBack,
  onSuccess,
}: ForgotPasswordScreenProps) {
  const [step, setStep] = useState<Step>('REQUEST');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);

  // Countdown timer for resend
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Step 1: Request Code
  const handleRequestOtp = async () => {
    setError('');
    const target = identifier.trim();
    if (!target) {
      setError('Please enter your registered email address');
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword(target);
      if (res.success) {
        if (res.otp) {
          setDevOtpHint(res.otp);
        }
        setResendCooldown(45);
        setStep('OTP');
      } else {
        setError(res.message || 'Account not found');
      }
    } catch (err: any) {
      setError(err?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Code
  const handleVerifyOtp = async () => {
    setError('');
    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length < 4) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    try {
      const res = await verifyResetOtp(identifier.trim(), cleanOtp);
      if (res.success) {
        setStep('NEW_PASSWORD');
      } else {
        setError(res.message || 'Invalid code');
      }
    } catch (err: any) {
      setError(err?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Set New Password
  const handleResetPassword = async () => {
    setError('');
    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(
        identifier.trim(),
        otp.trim(),
        newPassword
      );
      if (res.success) {
        setStep('SUCCESS');
      } else {
        setError(res.message || 'Could not reset password');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Bar */}
          <View style={styles.topRow}>
            {step !== 'SUCCESS' ? (
              <TouchableOpacity
                onPress={() => {
                  if (step === 'OTP') setStep('REQUEST');
                  else if (step === 'NEW_PASSWORD') setStep('OTP');
                  else onBack();
                }}
                activeOpacity={0.8}
                style={styles.backButton}
                accessibilityLabel="Go back"
              >
                <ArrowLeft size={20} color={PALETTE.onSurface} strokeWidth={2} />
              </TouchableOpacity>
            ) : (
              <View style={styles.headerSpacer} />
            )}

            <View style={styles.stepperContainer}>
              <View
                style={[
                  styles.stepperDot,
                  step === 'REQUEST' && styles.stepperDotActive,
                  (step === 'OTP' || step === 'NEW_PASSWORD' || step === 'SUCCESS') &&
                    styles.stepperDotDone,
                ]}
              />
              <View style={styles.stepperLine} />
              <View
                style={[
                  styles.stepperDot,
                  step === 'OTP' && styles.stepperDotActive,
                  (step === 'NEW_PASSWORD' || step === 'SUCCESS') &&
                    styles.stepperDotDone,
                ]}
              />
              <View style={styles.stepperLine} />
              <View
                style={[
                  styles.stepperDot,
                  (step === 'NEW_PASSWORD' || step === 'SUCCESS') &&
                    styles.stepperDotActive,
                ]}
              />
            </View>

            <View style={styles.headerSpacer} />
          </View>

          {/* Step 1: Email Entry */}
          {step === 'REQUEST' && (
            <>
              <View style={styles.headerBlock}>
                <Text style={styles.eyebrow}>EMAIL RECOVERY</Text>
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>
                  Enter your registered email address and we will send you a 6-digit
                  verification code to reset your password.
                </Text>
              </View>

              <View style={styles.formCard}>
                <View style={styles.cardIconCircle}>
                  <Mail size={24} color={PALETTE.primary} strokeWidth={2} />
                </View>

                <PrimaryInputField
                  label="Registered Email Address"
                  placeholder="name@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={identifier}
                  onChangeText={t => {
                    setIdentifier(t);
                    if (error) setError('');
                  }}
                  editable={!loading}
                  hasError={Boolean(error)}
                />

                <PrimaryErrorBanner message={error} />

                <PrimaryButton
                  title="Send Code to Email"
                  loading={loading}
                  onPress={handleRequestOtp}
                  style={styles.actionBtn}
                />
              </View>
            </>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'OTP' && (
            <>
              <View style={styles.headerBlock}>
                <Text style={styles.eyebrow}>STEP 2 OF 3</Text>
                <Text style={styles.title}>Check Your Email</Text>
                <Text style={styles.subtitle}>
                  We sent a 6-digit verification code to{' '}
                  <Text style={styles.boldText}>{identifier}</Text>. Please check your
                  inbox and spam folder.
                </Text>
              </View>

              <View style={styles.formCard}>
                {devOtpHint ? (
                  <View style={styles.otpNotice}>
                    <Text style={styles.otpNoticeLabel}>Your Verification Code:</Text>
                    <Text style={styles.otpNoticeCode}>{devOtpHint}</Text>
                  </View>
                ) : null}

                <PrimaryInputField
                  label="6-Digit Verification Code"
                  placeholder="e.g. 123456"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={otp}
                  onChangeText={t => {
                    setOtp(t);
                    if (error) setError('');
                  }}
                  editable={!loading}
                  hasError={Boolean(error)}
                />

                <PrimaryErrorBanner message={error} />

                <PrimaryButton
                  title="Verify Code"
                  loading={loading}
                  onPress={handleVerifyOtp}
                  style={styles.actionBtn}
                />

                <TouchableOpacity
                  disabled={resendCooldown > 0 || loading}
                  onPress={handleRequestOtp}
                  style={styles.resendRow}
                >
                  <Text style={styles.resendText}>
                    {resendCooldown > 0
                      ? `Resend email in ${resendCooldown}s`
                      : 'Did not receive email? Resend'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 'NEW_PASSWORD' && (
            <>
              <View style={styles.headerBlock}>
                <Text style={styles.eyebrow}>STEP 3 OF 3</Text>
                <Text style={styles.title}>Create New Password</Text>
                <Text style={styles.subtitle}>
                  Choose a strong password with at least 6 characters.
                </Text>
              </View>

              <View style={styles.formCard}>
                <PrimaryPasswordField
                  label="New Password"
                  placeholder="Enter new password"
                  value={newPassword}
                  visible={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                  onChangeText={t => {
                    setNewPassword(t);
                    if (error) setError('');
                  }}
                  editable={!loading}
                />

                <PrimaryPasswordField
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  visible={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  onChangeText={t => {
                    setConfirmPassword(t);
                    if (error) setError('');
                  }}
                  editable={!loading}
                  containerStyle={styles.lastField}
                />

                <PrimaryErrorBanner message={error} />

                <PrimaryButton
                  title="Save New Password"
                  loading={loading}
                  onPress={handleResetPassword}
                  style={styles.actionBtn}
                />
              </View>
            </>
          )}

          {/* Step 4: Success Screen */}
          {step === 'SUCCESS' && (
            <View style={styles.successCard}>
              <View style={styles.successIconBox}>
                <CheckCircle2 size={44} color={PALETTE.primary} strokeWidth={2.5} />
              </View>

              <Text style={styles.successTitle}>Password Updated!</Text>
              <Text style={styles.successSubtitle}>
                Your password has been securely reset. You can now log in with your
                new credentials.
              </Text>

              <PrimaryButton
                title="Back to Sign In"
                onPress={onSuccess}
                style={styles.actionBtn}
              />
            </View>
          )}
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.gutter,
    paddingTop: 16,
    paddingBottom: 40,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
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
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperDot: {
    width: 8,
    height: 8,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.border,
  },
  stepperDotActive: {
    width: 24,
    backgroundColor: PALETTE.primary,
  },
  stepperDotDone: {
    backgroundColor: PALETTE.primary,
  },
  stepperLine: {
    width: 16,
    height: 2,
    backgroundColor: PALETTE.border,
    marginHorizontal: 4,
  },
  headerSpacer: {
    width: 44,
  },
  headerBlock: {
    marginBottom: 20,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.primary,
    marginBottom: 6,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    marginBottom: 8,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '700',
    color: PALETTE.onSurface,
  },
  formCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: SPACING.lg,
    ...SHADOWS.softCard,
  },
  cardIconCircle: {
    width: 52,
    height: 52,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  otpNotice: {
    backgroundColor: PALETTE.illusCoralBg,
    borderRadius: RADII.lg,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  otpNoticeLabel: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 2,
  },
  otpNoticeCode: {
    ...TYPOGRAPHY.headlineMd,
    color: PALETTE.primary,
    letterSpacing: 4,
  },
  lastField: {
    marginBottom: 0,
  },
  actionBtn: {
    marginTop: 12,
  },
  resendRow: {
    marginTop: 16,
    alignItems: 'center',
  },
  resendText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.primary,
    fontWeight: '600',
  },
  successCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: SPACING.xl,
    alignItems: 'center',
    marginTop: 20,
    ...SHADOWS.softCard,
  },
  successIconBox: {
    width: 80,
    height: 80,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTitle: {
    ...TYPOGRAPHY.headlineLg,
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
});
