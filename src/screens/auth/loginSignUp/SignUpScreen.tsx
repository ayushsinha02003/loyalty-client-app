import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ArrowLeft,
  Check,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Store,
  Upload,
  User,
} from 'lucide-react-native';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';
import { registerUser, RegisterResponse } from '../../../services/authService';
import PrimaryInputField from '../../../components/input/PrimaryInputField';
import PrimaryPasswordField from '../../../components/input/PrimaryPasswordField';
import PrimaryButton from '../../../components/button/PrimaryButton';
import PrimaryErrorBanner from '../../../components/common/PrimaryErrorBanner';
import PrimaryCard from '../../../components/cards/PrimaryCard';
import PrimaryRoleButton from '../../../components/button/PrimaryRoleButton';

interface SignUpScreenProps {
  onSignup?: (data?: RegisterResponse) => void;
  onLogin?: () => void;
  onViewTerms?: () => void;
  onViewPrivacy?: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onSignup,
  onLogin,
  onViewTerms,
  onViewPrivacy,
}) => {
  const [role, setRole] = useState<'customer' | 'business'>('customer');
  const [adminStep, setAdminStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  // Common & User fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Business Step 1 fields
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  // Business Step 2 fields
  const [ownerName, setOwnerName] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPassword, setBusinessPassword] = useState('');
  const [businessConfirmPassword, setBusinessConfirmPassword] = useState('');
  const [showBusinessPassword, setShowBusinessPassword] = useState(false);
  const [showBusinessConfirmPassword, setShowBusinessConfirmPassword] = useState(false);
  const [logoUploaded, setLogoUploaded] = useState(false);

  // Error states
  const [generalError, setGeneralError] = useState('');

  // User field errors
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Admin Step 1 field errors
  const [businessNameError, setBusinessNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');

  // Admin Step 2 field errors
  const [ownerNameError, setOwnerNameError] = useState('');
  const [businessPhoneError, setBusinessPhoneError] = useState('');
  const [businessPasswordError, setBusinessPasswordError] = useState('');
  const [businessConfirmPasswordError, setBusinessConfirmPasswordError] = useState('');

  // Handle User Sign Up
  const handleUserSignup = async () => {
    let hasError = false;
    setNameError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setGeneralError('');

    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setNameError('Please enter full name');
      hasError = true;
    }

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
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm password');
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const response = await registerUser({
        name: trimmedName,
        phone: trimmedPhone,
        email: email.trim(),
        password: password,
        role: 'customer',
      });

      if (response.success) {
        onSignup?.(response);
      } else {
        const rawMessage = response.message || 'Registration failed';
        setGeneralError(rawMessage);
        if (rawMessage.toLowerCase().includes('phone')) {
          setPhoneError(rawMessage);
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

  // Handle Admin Step 1 -> Step 2
  const handleAdminStep1Next = () => {
    let hasError = false;
    setBusinessNameError('');
    setCategoryError('');
    setAddressError('');
    setCityError('');
    setGeneralError('');

    if (!businessName.trim()) {
      setBusinessNameError('Please enter business name');
      hasError = true;
    }

    if (!category.trim()) {
      setCategoryError('Please enter business category (e.g. Cafe, Salon)');
      hasError = true;
    }

    if (!address.trim()) {
      setAddressError('Please enter business address');
      hasError = true;
    }

    if (!city.trim()) {
      setCityError('Please enter city');
      hasError = true;
    }

    if (hasError) return;
    setAdminStep(2);
  };

  // Handle Admin Step 2 -> Step 3
  const handleAdminStep2Next = () => {
    let hasError = false;
    setOwnerNameError('');
    setBusinessPhoneError('');
    setBusinessPasswordError('');
    setBusinessConfirmPasswordError('');
    setGeneralError('');

    const trimmedOwner = ownerName.trim();
    const trimmedPhone = businessPhone.trim();

    if (!trimmedOwner) {
      setOwnerNameError('Please enter owner name');
      hasError = true;
    }

    if (!trimmedPhone) {
      setBusinessPhoneError('Please enter mobile number');
      hasError = true;
    } else if (trimmedPhone.length < 10) {
      setBusinessPhoneError('Please enter a valid 10-digit mobile number');
      hasError = true;
    }

    if (!businessPassword) {
      setBusinessPasswordError('Please enter password');
      hasError = true;
    } else if (businessPassword.length < 6) {
      setBusinessPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (!businessConfirmPassword) {
      setBusinessConfirmPasswordError('Please confirm password');
      hasError = true;
    } else if (businessPassword !== businessConfirmPassword) {
      setBusinessConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (hasError) return;
    setAdminStep(3);
  };

  // Handle Admin Final Registration (Step 3)
  const handleAdminRegister = async () => {
    setGeneralError('');
    setLoading(true);

    try {
      const response = await registerUser({
        name: ownerName.trim(),
        phone: businessPhone.trim(),
        email: businessEmail.trim(),
        password: businessPassword,
        role: 'business',
        businessName: businessName.trim(),
        category: category.trim(),
        address: address.trim(),
        city: city.trim(),
      });

      if (response.success) {
        onSignup?.(response);
      } else {
        const rawMessage = response.message || 'Registration failed';
        setGeneralError(rawMessage);
        if (rawMessage.toLowerCase().includes('phone')) {
          setBusinessPhoneError(rawMessage);
          setAdminStep(2);
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Title Section */}
          <View style={styles.header}>
            {role === 'business' ? (
              <View style={styles.stepperHeader}>
                {adminStep > 1 ? (
                  <TouchableOpacity
                    onPress={() => setAdminStep((adminStep - 1) as 1 | 2)}
                    style={styles.backButton}
                    disabled={loading}
                  >
                    <ArrowLeft size={20} strokeWidth={2} color={PALETTE.onSurface} />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.placeholderBox} />
                )}

                {/* 3-Step Stepper Progress */}
                <View style={styles.stepperContainer}>
                  <View style={[styles.stepDot, styles.stepDotActive]} />
                  <View
                    style={[
                      styles.stepLine,
                      adminStep >= 2 && styles.stepLineActive,
                    ]}
                  />
                  <View
                    style={[
                      styles.stepDot,
                      adminStep >= 2 && styles.stepDotActive,
                    ]}
                  />
                  <View
                    style={[
                      styles.stepLine,
                      adminStep >= 3 && styles.stepLineActive,
                    ]}
                  />
                  <View
                    style={[
                      styles.stepDot,
                      adminStep >= 3 && styles.stepDotActive,
                    ]}
                  />
                </View>

                <View style={styles.placeholderBox} />
              </View>
            ) : null}

            <Text style={styles.title}>
              {role === 'customer'
                ? 'Create Account'
                : adminStep === 1
                ? "Let's Set Up\nYour Business"
                : adminStep === 2
                ? 'Tell us more\nabout your business'
                : 'Almost Done!\nReview & Confirm'}
            </Text>

            <Text style={styles.subtitle}>
              {role === 'customer'
                ? 'Join us and start earning loyalty stamps'
                : `Step ${adminStep} of 3 • Business Setup`}
            </Text>
          </View>

          {/* Role Toggle Selector (Only on Step 1 if Admin, or always in User mode) */}
          {(role === 'customer' || adminStep === 1) && (
            <View style={styles.roleContainer}>
              <PrimaryRoleButton
                label="User"
                icon="account"
                active={role === 'customer'}
                onPress={() => {
                  setRole('customer');
                  setGeneralError('');
                }}
              />
              <PrimaryRoleButton
                label="Business Admin"
                icon="briefcase"
                active={role === 'business'}
                onPress={() => {
                  setRole('business');
                  setGeneralError('');
                }}
              />
            </View>
          )}

          {/* CUSTOMER REGISTRATION FORM */}
          {role === 'customer' && (
            <View style={styles.formContainer}>
              {/* Full Name */}
              <PrimaryInputField
                label="Full Name"
                placeholder="Enter full name"
                value={fullName}
                onChangeText={text => {
                  setFullName(text);
                  if (nameError) setNameError('');
                  if (generalError) setGeneralError('');
                }}
                editable={!loading}
                error={nameError}
                hasError={Boolean(generalError)}
              />

              {/* Phone Number */}
              <PrimaryInputField
                label="Phone Number"
                placeholder="Enter 10-digit mobile number"
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={text => {
                  setPhone(text);
                  if (phoneError) setPhoneError('');
                  if (generalError) setGeneralError('');
                }}
                editable={!loading}
                error={phoneError}
                hasError={Boolean(generalError)}
              />

              {/* Email (Optional) */}
              <PrimaryInputField
                label="Email Address (Optional)"
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
              />

              {/* Password */}
              <PrimaryPasswordField
                label="Create Password"
                placeholder="Enter password (min. 6 characters)"
                secureTextEntry={!showPassword}
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
              />

              {/* Confirm Password */}
              <PrimaryPasswordField
                label="Confirm Password"
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                visible={showConfirmPassword}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                onChangeText={text => {
                  setConfirmPassword(text);
                  if (confirmPasswordError) setConfirmPasswordError('');
                  if (generalError) setGeneralError('');
                }}
                editable={!loading}
                error={confirmPasswordError}
                hasError={Boolean(generalError)}
              />

              {/* General Error Banner */}
              <PrimaryErrorBanner message={generalError} />

              {/* Submit Button */}
              <PrimaryButton
                title="Create Account"
                loading={loading}
                onPress={handleUserSignup}
              />
            </View>
          )}

          {/* ADMIN BUSINESS SETUP - STEP 1: BUSINESS INFO */}
          {role === 'business' && adminStep === 1 && (
            <View style={styles.formContainer}>
              <PrimaryInputField
                label="Business Name"
                placeholder="e.g. Brew & Beans Cafe"
                value={businessName}
                onChangeText={text => {
                  setBusinessName(text);
                  if (businessNameError) setBusinessNameError('');
                }}
                error={businessNameError}
              />

              <PrimaryInputField
                label="Business Category"
                placeholder="e.g. Coffee Shop, Salon, Restaurant, Retail"
                value={category}
                onChangeText={text => {
                  setCategory(text);
                  if (categoryError) setCategoryError('');
                }}
                error={categoryError}
              />

              <PrimaryInputField
                label="Business Address"
                placeholder="Enter street address"
                value={address}
                onChangeText={text => {
                  setAddress(text);
                  if (addressError) setAddressError('');
                }}
                error={addressError}
              />

              <PrimaryInputField
                label="City"
                placeholder="Enter city"
                value={city}
                onChangeText={text => {
                  setCity(text);
                  if (cityError) setCityError('');
                }}
                error={cityError}
              />

              <PrimaryButton
                title="Continue to Step 2 →"
                onPress={handleAdminStep1Next}
              />
            </View>
          )}

          {/* ADMIN BUSINESS SETUP - STEP 2: OWNER CONTACT & SECURITY */}
          {role === 'business' && adminStep === 2 && (
            <View style={styles.formContainer}>
              {/* Business Logo Upload Card */}
              <View style={styles.uploadSection}>
                <Text style={styles.label}>Business Logo</Text>
                <TouchableOpacity
                  style={[
                    styles.uploadCard,
                    logoUploaded && styles.uploadCardDone,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setLogoUploaded(!logoUploaded)}
                >
                  <View style={styles.uploadIconCircle}>
                    {logoUploaded ? (
                      <Check size={22} strokeWidth={2.5} color={PALETTE.primary} />
                    ) : (
                      <Upload size={22} strokeWidth={2} color={PALETTE.primary} />
                    )}
                  </View>
                  <Text style={styles.uploadText}>
                    {logoUploaded ? 'Logo Added' : 'Upload Business Logo'}
                  </Text>
                </TouchableOpacity>
              </View>

              <PrimaryInputField
                label="Owner / Admin Name"
                placeholder="Enter owner or manager name"
                value={ownerName}
                onChangeText={text => {
                  setOwnerName(text);
                  if (ownerNameError) setOwnerNameError('');
                }}
                error={ownerNameError}
              />

              <PrimaryInputField
                label="Contact Mobile Number"
                placeholder="Enter 10-digit mobile number"
                keyboardType="phone-pad"
                maxLength={10}
                value={businessPhone}
                onChangeText={text => {
                  setBusinessPhone(text);
                  if (businessPhoneError) setBusinessPhoneError('');
                }}
                error={businessPhoneError}
              />

              <PrimaryInputField
                label="Business Email (Optional)"
                placeholder="e.g. contact@business.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={businessEmail}
                onChangeText={setBusinessEmail}
              />

              <PrimaryPasswordField
                label="Password"
                placeholder="Enter password (min. 6 characters)"
                secureTextEntry={!showBusinessPassword}
                value={businessPassword}
                visible={showBusinessPassword}
                onToggle={() => setShowBusinessPassword(!showBusinessPassword)}
                onChangeText={text => {
                  setBusinessPassword(text);
                  if (businessPasswordError) setBusinessPasswordError('');
                }}
                error={businessPasswordError}
              />

              <PrimaryPasswordField
                label="Confirm Password"
                placeholder="Confirm your password"
                secureTextEntry={!showBusinessConfirmPassword}
                value={businessConfirmPassword}
                visible={showBusinessConfirmPassword}
                onToggle={() =>
                  setShowBusinessConfirmPassword(!showBusinessConfirmPassword)
                }
                onChangeText={text => {
                  setBusinessConfirmPassword(text);
                  if (businessConfirmPasswordError)
                    setBusinessConfirmPasswordError('');
                }}
                error={businessConfirmPasswordError}
              />

              <View style={styles.buttonRow}>
                <PrimaryButton
                  variant="secondary"
                  title="Back"
                  onPress={() => setAdminStep(1)}
                  style={styles.secondaryButton}
                />

                <PrimaryButton
                  title="Review & Confirm →"
                  onPress={handleAdminStep2Next}
                  style={styles.flexButton}
                />
              </View>
            </View>
          )}

          {/* ADMIN BUSINESS SETUP - STEP 3: REVIEW & CONFIRM */}
          {role === 'business' && adminStep === 3 && (
            <View style={styles.formContainer}>
              <PrimaryCard style={styles.previewCard}>
                {/* Header */}
                <View style={styles.previewHeader}>
                  <View style={styles.previewLogo}>
                    <Store size={22} strokeWidth={2} color={PALETTE.primary} />
                  </View>
                  <View style={styles.previewHeaderText}>
                    <Text style={styles.previewBusinessName}>
                      {businessName || 'My Business'}
                    </Text>
                    <Text style={styles.previewCategory}>
                      {category || 'General Store'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setAdminStep(1)}
                    style={styles.editButton}
                    disabled={loading}
                  >
                    <Pencil size={18} strokeWidth={2} color={PALETTE.primary} />
                  </TouchableOpacity>
                </View>

                <View style={styles.previewDivider} />

                {/* Details */}
                <View style={styles.previewRow}>
                  <MapPin size={16} strokeWidth={2} color={PALETTE.onSurfaceVariant} style={styles.previewIconMargin} />
                  <Text style={styles.previewText}>
                    {address ? `${address}, ${city}` : 'No address specified'}
                  </Text>
                </View>

                <View style={styles.previewRow}>
                  <User size={16} strokeWidth={2} color={PALETTE.onSurfaceVariant} style={styles.previewIconMargin} />
                  <Text style={styles.previewText}>
                    {ownerName || 'Admin Owner'}
                  </Text>
                </View>

                <View style={styles.previewRow}>
                  <Phone size={16} strokeWidth={2} color={PALETTE.onSurfaceVariant} style={styles.previewIconMargin} />
                  <Text style={styles.previewText}>
                    +91 {businessPhone || '98765 43210'}
                  </Text>
                </View>

                {businessEmail ? (
                  <View style={styles.previewRow}>
                    <Mail size={16} strokeWidth={2} color={PALETTE.onSurfaceVariant} style={styles.previewIconMargin} />
                    <Text style={styles.previewText}>{businessEmail}</Text>
                  </View>
                ) : null}
              </PrimaryCard>

              {/* Error Banner if registration fails */}
              <PrimaryErrorBanner message={generalError} />

              <View style={styles.buttonRow}>
                <PrimaryButton
                  variant="secondary"
                  title="Back"
                  onPress={() => setAdminStep(2)}
                  disabled={loading}
                  style={styles.secondaryButton}
                />

                <PrimaryButton
                  title="Create Business"
                  loading={loading}
                  onPress={handleAdminRegister}
                  style={styles.flexButton}
                />
              </View>
            </View>
          )}

          {/* Terms & Privacy Policy Link */}
          <View style={styles.legalNoticeContainer}>
            <Text style={styles.legalNoticeText}>
              By registering, you agree to our{' '}
              <Text style={styles.legalLink} onPress={onViewTerms}>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text style={styles.legalLink} onPress={onViewPrivacy}>
                Privacy Policy
              </Text>
              .
            </Text>
          </View>

          {/* Footer - Switch to Login */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={onLogin} disabled={loading}>
              <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  stepperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  backArrow: {
    fontSize: 20,
    color: PALETTE.onSurface,
    fontWeight: '600',
  },
  placeholderBox: {
    width: 44,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: PALETTE.illusNeutralCream,
  },
  stepDotActive: {
    backgroundColor: PALETTE.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stepLine: {
    width: 26,
    height: 2.5,
    backgroundColor: PALETTE.illusNeutralCream,
    marginHorizontal: 4,
  },
  stepLineActive: {
    backgroundColor: PALETTE.primary,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.onSurface,
  },
  subtitle: {
    marginTop: 6,
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 8,
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadCard: {
    height: 104,
    borderRadius: RADII.xl,
    borderWidth: 1.5,
    borderColor: PALETTE.border,
    borderStyle: 'dashed',
    backgroundColor: PALETTE.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.softCard,
  },
  uploadCardDone: {
    borderColor: PALETTE.primary,
    backgroundColor: PALETTE.illusCoralBg,
  },
  uploadIconCircle: {
    width: 40,
    height: 40,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  uploadIcon: {
    fontSize: 18,
  },
  uploadText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onSurface,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  flexButton: {
    flex: 1,
  },
  secondaryButton: {
    paddingHorizontal: 22,
  },
  previewCard: {
    marginBottom: 20,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewLogo: {
    width: 50,
    height: 50,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewLogoEmoji: {
    fontSize: 24,
  },
  previewHeaderText: {
    flex: 1,
    marginLeft: 14,
  },
  previewBusinessName: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
    marginBottom: 2,
  },
  previewCategory: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 18,
  },
  previewDivider: {
    height: 1,
    backgroundColor: PALETTE.border,
    marginVertical: 16,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewIconMargin: {
    marginRight: 10,
  },
  previewText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
    flex: 1,
  },
  legalNoticeContainer: {
    paddingHorizontal: 12,
    marginTop: 20,
    marginBottom: 8,
    alignItems: 'center',
  },
  legalNoticeText: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
    color: PALETTE.onSurfaceVariant,
    lineHeight: 18,
  },
  legalLink: {
    color: PALETTE.primary,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 20,
  },
  footerText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
  },
  loginText: {
    marginLeft: 6,
    ...TYPOGRAPHY.labelSm,
    fontSize: 14,
    color: PALETTE.primary,
  },
});
