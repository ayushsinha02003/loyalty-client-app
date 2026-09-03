import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import PrimaryFormInput from '../../../components/input/PrimaryFormInput';
import PrimaryPasswordField from '../../../components/input/PrimaryPasswordField';
import PrimaryRoleButton from '../../../components/button/PrimaryRoleButton';
import PrimaryText from '../../../components/text/PrimaryText';

interface SignUpScreenProps {
  onSignup: () => void;
  onLogin: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignup, onLogin }) => {
  const [role, setRole] = useState<'customer' | 'business'>('customer');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.content}>
        <View style={styles.header}>
          <PrimaryText text="Create Account" customStyle={styles.title} />
          <PrimaryText
            text="Join us and get started"
            customStyle={styles.subtitle}
          />
        </View>

        <PrimaryText
          text="Create account as"
          customStyle={styles.sectionLabel}
        />

        <View style={styles.roleContainer}>
          <PrimaryRoleButton
            label="User"
            active={role === 'customer'}
            onPress={() => setRole('customer')}
          />
          <PrimaryRoleButton
            label="Admin"
            active={role === 'business'}
            onPress={() => setRole('business')}
          />
        </View>

        <PrimaryFormInput
          label="Full Name"
          placeholder="Enter full name"
          value={fullName}
          onChangeText={setFullName}
        />
        <PrimaryFormInput
          label="Phone Number"
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <PrimaryFormInput
          label="Email"
          placeholder="Enter email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {role === 'business' && (
          <PrimaryFormInput
            label="Admin Code"
            placeholder="Enter admin code"
            value={adminCode}
            onChangeText={setAdminCode}
          />
        )}

        <PrimaryPasswordField
          label="Password"
          placeholder="Enter password"
          value={password}
          visible={showPassword}
          onChangeText={setPassword}
          onToggle={() => setShowPassword(current => !current)}
        />
        <PrimaryPasswordField
          label="Confirm Password"
          placeholder="Confirm password"
          value={confirmPassword}
          visible={showConfirmPassword}
          onChangeText={setConfirmPassword}
          onToggle={() => setShowConfirmPassword(current => !current)}
        />

        <TouchableOpacity
          style={styles.signupButton}
          onPress={onSignup}
          activeOpacity={0.85}
        >
          <PrimaryText
            text={
              role === 'business' ? 'Create Admin Account' : 'Create Account'
            }
            customStyle={styles.signupButtonText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <PrimaryText
          text="Already have an account?"
          customStyle={styles.footerText}
        />
        <TouchableOpacity onPress={onLogin}>
          <PrimaryText text="Login" customStyle={styles.loginText} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingTop: 24,
    paddingBottom: 28,
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
  },
  header: {
    marginBottom: 26,
  },
  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '800',
    color: '#172033',
  },
  subtitle: {
    marginTop: 6,
    color: '#64748B',
    fontSize: 15,
    fontWeight: '500',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  signupButton: {
    marginTop: 4,
    backgroundColor: '#7B3FF2',
    minHeight: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7B3FF2',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
  },
  footerText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  loginText: {
    marginLeft: 5,
    color: '#7B3FF2',
    fontWeight: '700',
    fontSize: 14,
  },
});
