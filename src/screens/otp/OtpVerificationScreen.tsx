import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';
import PrimaryButton from '../../components/button/PrimaryButton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

interface OtpVerificationScreenProps {
  phoneNumber?: string;
  onVerify?: (otp: string) => void;
  onResend?: () => void;
  onBack?: () => void;
}

export default function OtpVerificationScreen({
  phoneNumber = '+91 98765 43210',
  onVerify,
  onResend,
  onBack,
}: OtpVerificationScreenProps) {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(45);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = otp.join('');
    onVerify?.(fullCode);
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
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
            <Text style={styles.eyebrow}>Security Check</Text>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to{'\n'}
              <Text style={styles.phoneHighlight}>{phoneNumber}</Text>
            </Text>
          </View>

          <View style={styles.otpRow}>
            {otp.map((digit, index) => {
              const isFilled = digit.length > 0;
              return (
                <TextInput
                  key={index}
                  ref={ref => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[styles.otpBox, isFilled && styles.otpBoxFilled]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={val => handleOtpChange(val, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  selectTextOnFocus
                />
              );
            })}
          </View>

          <View style={styles.resendSection}>
            {timer > 0 ? (
              <Text style={styles.resendTimerText}>
                Resend code in <Text style={styles.timerBold}>{formatTimer()}</Text>
              </Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setTimer(45);
                  onResend?.();
                }}
              >
                <Text style={styles.resendLink}>Resend code</Text>
              </TouchableOpacity>
            )}
          </View>

          <PrimaryButton
            title="Verify & Continue"
            onPress={handleVerify}
            style={styles.verifyButton}
          />

          <View style={styles.securityRow}>
            <ShieldCheck size={18} strokeWidth={2} color={PALETTE.primary} />
            <Text style={styles.securityText}>
              Your account details stay encrypted and private.
            </Text>
          </View>
        </View>
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
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  header: {
    paddingVertical: 12,
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
    marginTop: 20,
    alignItems: 'center',
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.primary,
    marginBottom: 8,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.onSurface,
    marginBottom: 10,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
    textAlign: 'center',
  },
  phoneHighlight: {
    color: PALETTE.onSurface,
    fontWeight: '700',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  otpBox: {
    width: 46,
    height: 56,
    borderWidth: 1,
    borderColor: PALETTE.border,
    borderRadius: RADII.lg,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: PALETTE.onSurface,
    backgroundColor: PALETTE.surface,
    ...SHADOWS.softCard,
  },
  otpBoxFilled: {
    borderColor: PALETTE.primary,
    borderWidth: 1.5,
  },
  resendSection: {
    marginTop: 26,
    alignItems: 'center',
  },
  resendTimerText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
  },
  timerBold: {
    color: PALETTE.primary,
    fontWeight: '700',
  },
  resendLink: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 14,
    color: PALETTE.primary,
  },
  verifyButton: {
    marginTop: 32,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 28,
    paddingHorizontal: 16,
  },
  securityText: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    textAlign: 'center',
  },
});
