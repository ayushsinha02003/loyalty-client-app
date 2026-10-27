import React, { useState } from 'react';
import {
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
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter business name"
                placeholderTextColor="#94A3B8"
                value={businessName}
                onChangeText={setBusinessName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Category</Text>
              <TextInput
                style={styles.input}
                placeholder="Select category (e.g. Coffee Shop, Salon)"
                placeholderTextColor="#94A3B8"
                value={category}
                onChangeText={setCategory}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter address"
                placeholderTextColor="#94A3B8"
                value={address}
                onChangeText={setAddress}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter city"
                placeholderTextColor="#94A3B8"
                value={city}
                onChangeText={setCity}
              />
            </View>
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
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
    color: '#6366F1',
    marginTop: 8,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
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
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#4F46E5',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
