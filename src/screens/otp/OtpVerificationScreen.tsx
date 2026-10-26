import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

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

    // Auto-focus next input
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
    if (onVerify) {
      onVerify(fullCode);
    }
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          </View>

          {/* Title & Subtitle */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              Enter the 6 digit code sent to{'\n'}
              <Text style={styles.phoneHighlight}>{phoneNumber}</Text>
            </Text>
          </View>

          {/* 6 Digit Input Boxes */}
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

          {/* Resend Timer */}
          <View style={styles.resendSection}>
            {timer > 0 ? (
              <Text style={styles.resendTimerText}>
                Resend code in{' '}
                <Text style={styles.timerBold}>{formatTimer()}</Text>
              </Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setTimer(45);
                  if (onResend) onResend();
                }}
              >
                <Text style={styles.resendLink}>Resend code</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerify}
            activeOpacity={0.85}
          >
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>

          {/* Security Assurance */}
          <View style={styles.securityRow}>
            <Text style={styles.shieldIcon}>🛡️</Text>
            <Text style={styles.securityText}>
              Your data is 100% secure and will never be shared.
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
    backgroundColor: '#FFFFFF',
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
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: '#1E293B',
    fontWeight: '600',
  },
  titleSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  phoneHighlight: {
    color: '#1E293B',
    fontWeight: '700',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 36,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    backgroundColor: '#F8FAFC',
  },
  otpBoxFilled: {
    borderColor: '#6366F1',
    backgroundColor: '#FFFFFF',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  resendSection: {
    marginTop: 28,
    alignItems: 'center',
  },
  resendTimerText: {
    fontSize: 14,
    color: '#64748B',
  },
  timerBold: {
    color: '#6366F1',
    fontWeight: '700',
  },
  resendLink: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '700',
  },
  verifyButton: {
    backgroundColor: '#6366F1',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    paddingHorizontal: 16,
  },
  shieldIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  securityText: {
    fontSize: 12.5,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
});
