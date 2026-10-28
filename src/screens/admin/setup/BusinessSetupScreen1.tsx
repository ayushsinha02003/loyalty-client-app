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

interface BusinessSetupScreen1Props {
  onBack?: () => void;
  onNext?: (data: {
    businessName: string;
    category: string;
    address: string;
    city: string;
  }) => void;
}

export default function BusinessSetupScreen1({
  onBack,
  onNext,
}: BusinessSetupScreen1Props) {
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const handleNext = () => {
    onNext?.({
      businessName: businessName || 'Brew & Beans',
      category: category || 'Coffee Shop',
      address: address || '123, MG Road',
      city: city || 'Indore',
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
              <View style={styles.stepDot} />
              <View style={styles.stepLine} />
              <View style={styles.stepDot} />
            </View>

            <View style={styles.placeholder} />
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Let's Set Up{'\n'}Your Business</Text>
            <Text style={styles.stepIndicator}>Step 1 of 3</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <PrimaryInputField
              label="Business Name"
              placeholder="Enter business name"
              value={businessName}
              onChangeText={setBusinessName}
            />

            <PrimaryInputField
              label="Business Category"
              placeholder="Select category (e.g. Coffee Shop, Salon)"
              value={category}
              onChangeText={setCategory}
            />

            <PrimaryInputField
              label="Business Address"
              placeholder="Enter address"
              value={address}
              onChangeText={setAddress}
            />

            <PrimaryInputField
              label="City"
              placeholder="Enter city"
              value={city}
              onChangeText={setCity}
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
    backgroundColor: '#7B3FF2',
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
    backgroundColor: '#7B3FF2',
  },
  placeholder: {
    width: 44,
  },
  titleSection: {
    marginTop: 18,
    marginBottom: 28,
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
    color: '#7B3FF2',
    marginTop: 8,
  },
  formContainer: {
    marginBottom: 16,
  },
});
