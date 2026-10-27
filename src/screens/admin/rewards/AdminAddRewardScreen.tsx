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

interface AdminAddRewardScreenProps {
  onBack?: () => void;
  onSave?: () => void;
}

export default function AdminAddRewardScreen({
  onBack,
  onSave,
}: AdminAddRewardScreenProps) {
  const [rewardName, setRewardName] = useState('');
  const [requiredStamps, setRequiredStamps] = useState('');
  const [description, setDescription] = useState('');
  const [validity, setValidity] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Reward</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Upload Area */}
          <View style={styles.uploadSection}>
            <Text style={styles.label}>Reward Image</Text>
            <TouchableOpacity style={styles.uploadBox} activeOpacity={0.8}>
              <View style={styles.uploadCircle}>
                <Text style={styles.uploadEmoji}>☁️</Text>
              </View>
              <Text style={styles.uploadText}>Upload Image</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reward Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter reward name"
                placeholderTextColor="#94A3B8"
                value={rewardName}
                onChangeText={setRewardName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Required Stamps</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter required stamps (e.g. 100)"
                placeholderTextColor="#94A3B8"
                keyboardType="number-pad"
                value={requiredStamps}
                onChangeText={setRequiredStamps}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter description"
                placeholderTextColor="#94A3B8"
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Validity (days)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter validity (optional)"
                placeholderTextColor="#94A3B8"
                keyboardType="number-pad"
                value={validity}
                onChangeText={setValidity}
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={onSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveButtonText}>Save Reward</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
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
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  uploadSection: {
    marginVertical: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  uploadBox: {
    height: 130,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  uploadEmoji: {
    fontSize: 18,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4F46E5',
  },
  formContainer: {
    marginVertical: 10,
  },
  inputGroup: {
    marginBottom: 18,
  },
  input: {
    height: 54,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
