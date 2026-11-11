import React, { useState } from 'react';
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
import { loginUser, LoginResponse } from '../../../services/authService';
import PrimaryInputField from '../../../components/input/PrimaryInputField';
import PrimaryPasswordField from '../../../components/input/PrimaryPasswordField';
import PrimaryButton from '../../../components/button/PrimaryButton';
import PrimaryErrorBanner from '../../../components/common/PrimaryErrorBanner';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

interface LoginScreenProps {
  role?: 'customer' | 'business';
  onLogin: (data?: LoginResponse) => void;
  onSignup: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  role: _role = 'customer',
  onLogin,
  onSignup,
}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleLogin = async () => {
    let hasError = false;

    setPhoneError('');
    setPasswordError('');
    setGeneralError('');

    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      setPhoneError('Please enter phone number');
      hasError = true;
    } else if (trimmedPhone.length < 10) {
      setPhoneError('Please enter a valid 10-digit phone number');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Please enter password');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({
        phone: trimmedPhone,
        password,
      });

      if (response.success) {
        onLogin(response);
      } else {
        const rawMessage = response.message || '';
        const lower = rawMessage.toLowerCase();
        if (
          lower.includes('user not found') ||
          lower.includes('not found') ||
          lower.includes('invalid') ||
          lower.includes('credential') ||
          lower.includes('password')
        ) {
          setGeneralError('Incorrect phone no. or password');
        } else {
          setGeneralError(rawMessage || 'Incorrect phone no. or password');
        }
      }
    } catch (error: any) {
      setGeneralError(
        error?.message ||
          'Unable to connect to the server. Please check your internet connection.'
      );
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
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Account Access</Text>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to access your digital loyalty cards
            </Text>
          </View>

          <View style={styles.formCard}>
            <PrimaryInputField
              label="Phone Number"
              placeholder="Enter 10-digit phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={text => {
                setPhone(text);
                if (phoneError) setPhoneError('');
                if (generalError) setGeneralError('');
              }}
              maxLength={10}
              editable={!loading}
              error={phoneError}
              hasError={Boolean(generalError)}
            />

            <PrimaryPasswordField
              label="Password"
              placeholder="Enter password"
              value={password}
              visible={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
              onChangeText={text => {
                setPassword(text);
                if (passwordError) setPasswordError('');
                if (generalError) setGeneralError('');
              }}
              editable={!loading}
              error={passwordError}
              hasError={Boolean(generalError)}
              containerStyle={styles.passwordContainerStyle}
            />

            <TouchableOpacity
              onPress={() => {}}
              disabled={loading}
              style={styles.forgotPasswordTouchable}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <PrimaryErrorBanner message={generalError} />

            <PrimaryButton
              title="Login"
              loading={loading}
              onPress={handleLogin}
              style={styles.loginButton}
            />
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don&apos;t have an account?</Text>
            <TouchableOpacity
              onPress={onSignup}
              disabled={loading}
              style={styles.signupTouch}
            >
              <Text style={styles.signupText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
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
    marginTop: 8,
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
  },
  formCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 20,
    marginBottom: 24,
    ...SHADOWS.softCard,
  },
  passwordContainerStyle: {
    marginBottom: 8,
  },
  forgotPasswordTouchable: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    paddingVertical: 4,
  },
  forgotPassword: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.primary,
  },
  loginButton: {
    marginTop: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
  },
  signupTouch: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  signupText: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 14,
    color: PALETTE.primary,
  },
});
