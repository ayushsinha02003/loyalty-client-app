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

interface AdminAddStampCardScreenProps {
  onBack?: () => void;
  onSave?: () => void;
}

export default function AdminAddStampCardScreen({
  onBack,
  onSave,
}: AdminAddStampCardScreenProps) {
  const [cardName, setCardName] = useState('');
  const [description, setDescription] = useState('');
  const [totalStamps, setTotalStamps] = useState('');
  const [reward, setReward] = useState('');
  const [validity, setValidity] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Stamp Card</Text>
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
          {/* Card Image Upload Banner */}
          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.8}>
            <View style={styles.uploadCircle}>
              <Text style={styles.uploadEmoji}>☁️</Text>
            </View>
            <Text style={styles.uploadHeading}>Upload Card Image</Text>
            <Text style={styles.uploadSubtext}>Recommended size: 800x400</Text>
          </TouchableOpacity>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter card name"
                placeholderTextColor="#94A3B8"
                value={cardName}
                onChangeText={setCardName}
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
              <Text style={styles.label}>Total Stamps</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter total stamps (e.g. 10)"
                placeholderTextColor="#94A3B8"
                keyboardType="number-pad"
                value={totalStamps}
                onChangeText={setTotalStamps}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reward (e.g. Free Coffee)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter reward"
                placeholderTextColor="#94A3B8"
                value={reward}
                onChangeText={setReward}
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
            <Text style={styles.saveButtonText}>Save Card</Text>
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
  uploadBox: {
    height: 140,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
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
  uploadHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: 2,
  },
  uploadSubtext: {
    fontSize: 12,
    color: '#94A3B8',
  },
  formContainer: {
    marginVertical: 10,
  },
  inputGroup: {
    marginBottom: 18,
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
