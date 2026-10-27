import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { registerUser, RegisterResponse } from '../../../services/authService';

interface SignUpScreenProps {
  onSignup?: (data?: RegisterResponse) => void;
  onLogin?: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignup, onLogin }) => {
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
          // Jump back to Step 2 so user can correct the phone
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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

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
                    <Text style={styles.backArrow}>←</Text>
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
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'customer' && styles.roleButtonActive,
                ]}
                onPress={() => {
                  setRole('customer');
                  setGeneralError('');
                }}
                disabled={loading}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    role === 'customer' && styles.roleButtonTextActive,
                  ]}
                >
                  👤 User
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'business' && styles.roleButtonActive,
                ]}
                onPress={() => {
                  setRole('business');
                  setGeneralError('');
                }}
                disabled={loading}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    role === 'business' && styles.roleButtonTextActive,
                  ]}
                >
                  💼 Admin (Business)
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* CUSTOMER REGISTRATION FORM */}
          {role === 'customer' && (
            <View style={styles.formContainer}>
              {/* Full Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    (!!nameError || !!generalError) && styles.inputErrorBorder,
                  ]}
                  placeholder="Enter full name"
                  placeholderTextColor="#94A3B8"
                  value={fullName}
                  onChangeText={text => {
                    setFullName(text);
                    if (nameError) setNameError('');
                    if (generalError) setGeneralError('');
                  }}
                  editable={!loading}
                />
                {nameError ? (
                  <Text style={styles.fieldError}>{nameError}</Text>
                ) : null}
              </View>

              {/* Phone Number */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={[
                    styles.input,
                    (!!phoneError || !!generalError) && styles.inputErrorBorder,
                  ]}
                  placeholder="Enter 10-digit mobile number"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={text => {
                    setPhone(text);
                    if (phoneError) setPhoneError('');
                    if (generalError) setGeneralError('');
                  }}
                  editable={!loading}
                />
                {phoneError ? (
                  <Text style={styles.fieldError}>{phoneError}</Text>
                ) : null}
              </View>

              {/* Email (Optional) */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter email address"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  editable={!loading}
                />
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Create Password</Text>
                <View
                  style={[
                    styles.passwordContainer,
                    (!!passwordError || !!generalError) && styles.inputErrorBorder,
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter password (min. 6 characters)"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={text => {
                      setPassword(text);
                      if (passwordError) setPasswordError('');
                      if (generalError) setGeneralError('');
                    }}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    <Text style={styles.showText}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text style={styles.fieldError}>{passwordError}</Text>
                ) : null}
              </View>

              {/* Confirm Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View
                  style={[
                    styles.passwordContainer,
                    (!!confirmPasswordError || !!generalError) &&
                      styles.inputErrorBorder,
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm your password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={text => {
                      setConfirmPassword(text);
                      if (confirmPasswordError) setConfirmPasswordError('');
                      if (generalError) setGeneralError('');
                    }}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    disabled={loading}
                  >
                    <Text style={styles.showText}>
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {confirmPasswordError ? (
                  <Text style={styles.fieldError}>{confirmPasswordError}</Text>
                ) : null}
              </View>

              {/* General Error Banner */}
              {generalError ? (
                <View style={styles.errorBanner}>
                  <Text style={styles.errorBannerIcon}>⚠️</Text>
                  <Text style={styles.errorBannerText}>{generalError}</Text>
                </View>
              ) : null}

              {/* Submit Button */}
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  loading && styles.buttonDisabled,
                ]}
                onPress={handleUserSignup}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.primaryButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* ADMIN BUSINESS SETUP - STEP 1: BUSINESS INFO */}
          {role === 'business' && adminStep === 1 && (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Business Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    !!businessNameError && styles.inputErrorBorder,
                  ]}
                  placeholder="e.g. Brew & Beans Cafe"
                  placeholderTextColor="#94A3B8"
                  value={businessName}
                  onChangeText={text => {
                    setBusinessName(text);
                    if (businessNameError) setBusinessNameError('');
                  }}
                />
                {businessNameError ? (
                  <Text style={styles.fieldError}>{businessNameError}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Business Category</Text>
                <TextInput
                  style={[
                    styles.input,
                    !!categoryError && styles.inputErrorBorder,
                  ]}
                  placeholder="e.g. Coffee Shop, Salon, Restaurant, Retail"
                  placeholderTextColor="#94A3B8"
                  value={category}
                  onChangeText={text => {
                    setCategory(text);
                    if (categoryError) setCategoryError('');
                  }}
                />
                {categoryError ? (
                  <Text style={styles.fieldError}>{categoryError}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Business Address</Text>
                <TextInput
                  style={[
                    styles.input,
                    !!addressError && styles.inputErrorBorder,
                  ]}
                  placeholder="Enter street address"
                  placeholderTextColor="#94A3B8"
                  value={address}
                  onChangeText={text => {
                    setAddress(text);
                    if (addressError) setAddressError('');
                  }}
                />
                {addressError ? (
                  <Text style={styles.fieldError}>{addressError}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={[
                    styles.input,
                    !!cityError && styles.inputErrorBorder,
                  ]}
                  placeholder="Enter city"
                  placeholderTextColor="#94A3B8"
                  value={city}
                  onChangeText={text => {
                    setCity(text);
                    if (cityError) setCityError('');
                  }}
                />
                {cityError ? (
                  <Text style={styles.fieldError}>{cityError}</Text>
                ) : null}
              </View>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleAdminStep1Next}
              >
                <Text style={styles.primaryButtonText}>
                  Continue to Step 2 →
                </Text>
              </TouchableOpacity>
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
                    <Text style={styles.uploadIcon}>
                      {logoUploaded ? '✓' : '☁️'}
                    </Text>
                  </View>
                  <Text style={styles.uploadText}>
                    {logoUploaded ? 'Logo Added' : 'Upload Business Logo'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Owner / Admin Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    !!ownerNameError && styles.inputErrorBorder,
                  ]}
                  placeholder="Enter owner or manager name"
                  placeholderTextColor="#94A3B8"
                  value={ownerName}
                  onChangeText={text => {
                    setOwnerName(text);
                    if (ownerNameError) setOwnerNameError('');
                  }}
                />
                {ownerNameError ? (
                  <Text style={styles.fieldError}>{ownerNameError}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Contact Mobile Number</Text>
                <TextInput
                  style={[
                    styles.input,
                    !!businessPhoneError && styles.inputErrorBorder,
                  ]}
                  placeholder="Enter 10-digit mobile number"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={businessPhone}
                  onChangeText={text => {
                    setBusinessPhone(text);
                    if (businessPhoneError) setBusinessPhoneError('');
                  }}
                />
                {businessPhoneError ? (
                  <Text style={styles.fieldError}>{businessPhoneError}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Business Email (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. contact@business.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={businessEmail}
                  onChangeText={setBusinessEmail}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View
                  style={[
                    styles.passwordContainer,
                    !!businessPasswordError && styles.inputErrorBorder,
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter password (min. 6 characters)"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showBusinessPassword}
                    value={businessPassword}
                    onChangeText={text => {
                      setBusinessPassword(text);
                      if (businessPasswordError)
                        setBusinessPasswordError('');
                    }}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setShowBusinessPassword(!showBusinessPassword)
                    }
                  >
                    <Text style={styles.showText}>
                      {showBusinessPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {businessPasswordError ? (
                  <Text style={styles.fieldError}>
                    {businessPasswordError}
                  </Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View
                  style={[
                    styles.passwordContainer,
                    !!businessConfirmPasswordError && styles.inputErrorBorder,
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm your password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showBusinessConfirmPassword}
                    value={businessConfirmPassword}
                    onChangeText={text => {
                      setBusinessConfirmPassword(text);
                      if (businessConfirmPasswordError)
                        setBusinessConfirmPasswordError('');
                    }}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setShowBusinessConfirmPassword(
                        !showBusinessConfirmPassword
                      )
                    }
                  >
                    <Text style={styles.showText}>
                      {showBusinessConfirmPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {businessConfirmPasswordError ? (
                  <Text style={styles.fieldError}>
                    {businessConfirmPasswordError}
                  </Text>
                ) : null}
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => setAdminStep(1)}
                >
                  <Text style={styles.secondaryButtonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.primaryButton, styles.flexButton]}
                  onPress={handleAdminStep2Next}
                >
                  <Text style={styles.primaryButtonText}>
                    Review & Confirm →
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ADMIN BUSINESS SETUP - STEP 3: REVIEW & CONFIRM */}
          {role === 'business' && adminStep === 3 && (
            <View style={styles.formContainer}>
              <View style={styles.previewCard}>
                {/* Header */}
                <View style={styles.previewHeader}>
                  <View style={styles.previewLogo}>
                    <Text style={styles.previewLogoEmoji}>☕</Text>
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
                    <Text style={styles.editIcon}>✏️</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.previewDivider} />

                {/* Details */}
                <View style={styles.previewRow}>
                  <Text style={styles.previewIcon}>📍</Text>
                  <Text style={styles.previewText}>
                    {address ? `${address}, ${city}` : 'No address specified'}
                  </Text>
                </View>

                <View style={styles.previewRow}>
                  <Text style={styles.previewIcon}>👤</Text>
                  <Text style={styles.previewText}>
                    {ownerName || 'Admin Owner'}
                  </Text>
                </View>

                <View style={styles.previewRow}>
                  <Text style={styles.previewIcon}>📞</Text>
                  <Text style={styles.previewText}>
                    +91 {businessPhone || '98765 43210'}
                  </Text>
                </View>

                {businessEmail ? (
                  <View style={styles.previewRow}>
                    <Text style={styles.previewIcon}>✉️</Text>
                    <Text style={styles.previewText}>{businessEmail}</Text>
                  </View>
                ) : null}
              </View>

              {/* Error Banner if registration fails */}
              {generalError ? (
                <View style={styles.errorBanner}>
                  <Text style={styles.errorBannerIcon}>⚠️</Text>
                  <Text style={styles.errorBannerText}>{generalError}</Text>
                </View>
              ) : null}

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => setAdminStep(2)}
                  disabled={loading}
                >
                  <Text style={styles.secondaryButtonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    styles.flexButton,
                    loading && styles.buttonDisabled,
                  ]}
                  onPress={handleAdminRegister}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.primaryButtonText}>
                      Create Business
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}

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
    backgroundColor: '#FFFFFF',
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
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: '#1E293B',
    fontWeight: '600',
  },
  placeholderBox: {
    width: 40,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E2E8F0',
  },
  stepDotActive: {
    backgroundColor: '#7B3FF2',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stepLine: {
    width: 26,
    height: 2.5,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  stepLineActive: {
    backgroundColor: '#7B3FF2',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    lineHeight: 36,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  roleButton: {
    flex: 1,
    height: 52,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  roleButtonActive: {
    borderColor: '#7B3FF2',
    backgroundColor: '#F3EEFF',
  },
  roleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  roleButtonTextActive: {
    color: '#7B3FF2',
    fontWeight: '700',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  passwordContainer: {
    height: 54,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    paddingVertical: 0,
  },
  showText: {
    color: '#7B3FF2',
    fontWeight: '600',
    fontSize: 14,
  },
  inputErrorBorder: {
    borderColor: '#DC2626',
    borderWidth: 1.5,
  },
  fieldError: {
    color: '#DC2626',
    fontSize: 13,
    marginTop: 6,
    fontWeight: '500',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  errorBannerIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  errorBannerText: {
    flex: 1,
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadCard: {
    height: 100,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadCardDone: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  uploadIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  uploadIcon: {
    fontSize: 18,
  },
  uploadText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7B3FF2',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: '#7B3FF2',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7B3FF2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  flexButton: {
    flex: 1,
  },
  secondaryButton: {
    height: 56,
    paddingHorizontal: 22,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EDE9FE',
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
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
  },
  previewCategory: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 18,
  },
  previewDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 16,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  previewText: {
    fontSize: 14,
    color: '#475569',
    flex: 1,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 20,
  },
  footerText: {
    color: '#64748B',
    fontSize: 15,
  },
  loginText: {
    marginLeft: 6,
    color: '#7B3FF2',
    fontSize: 15,
    fontWeight: '700',
  },
});
