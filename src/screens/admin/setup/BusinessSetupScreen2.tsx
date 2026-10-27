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
import PrimaryInputField from '../../../components/input/PrimaryInputField';
import PrimaryButton from '../../../components/button/PrimaryButton';

interface BusinessSetupScreen2Props {
  onBack?: () => void;
  onNext?: (data: {
    contactNumber: string;
    email: string;
  }) => void;
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            {/* Stepper Progress */}
            <View style={styles.stepperContainer}>
              <View style={[styles.stepDot, styles.stepDotActive]} />
              <View style={[styles.stepLine, styles.stepLineActive]} />
              <View style={[styles.stepDot, styles.stepDotActive]} />
              <View style={styles.stepLine} />
              <View style={styles.stepDot} />
            </View>

            <View style={styles.placeholder} />
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Tell us more{'\n'}about your business</Text>
            <Text style={styles.stepIndicator}>Step 2 of 3</Text>
          </View>

          {/* Business Logo Upload Card */}
          <View style={styles.uploadSection}>
            <Text style={styles.label}>Business Logo</Text>
            <TouchableOpacity style={styles.uploadCard} activeOpacity={0.8}>
              <View style={styles.uploadIconCircle}>
                <Text style={styles.uploadIcon}>☁️</Text>
              </View>
              <Text style={styles.uploadText}>Upload Logo</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <PrimaryInputField
              label="Contact Number"
              placeholder="+91  98765 43210"
              keyboardType="phone-pad"
              value={contactNumber}
              onChangeText={setContactNumber}
            />

            <PrimaryInputField
              label="Email"
              placeholder="business@email.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Next Button */}
          <PrimaryButton
            title="Next"
            onPress={handleNext}
          />
        </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: '#4F46E5',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stepLine: {
    width: 24,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  stepLineActive: {
    backgroundColor: '#4F46E5',
  },
  placeholder: {
    width: 44,
  },
  titleSection: {
    marginTop: 18,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    lineHeight: 36,
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
    marginTop: 8,
  },
  uploadSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  uploadCard: {
    height: 120,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  uploadIcon: {
    fontSize: 18,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4F46E5',
  },
  formContainer: {
    marginBottom: 16,
  },
});
