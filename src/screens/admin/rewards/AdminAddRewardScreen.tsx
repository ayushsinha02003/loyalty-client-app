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
  Alert,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { loyaltyCardApi } from '../../../services/api';
import PrimaryButton from '../../../components/button/PrimaryButton';

interface AdminAddRewardScreenProps {
  onBack?: () => void;
  onSave?: () => void;
}

export default function AdminAddRewardScreen({
  onBack,
  onSave,
}: AdminAddRewardScreenProps) {
  const [rewardName, setRewardName] = useState('');
  const [requiredStamps, setRequiredStamps] = useState('10');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!rewardName.trim()) {
      Alert.alert('Required', 'Please enter a reward name');
      return;
    }

    const stamps = parseInt(requiredStamps, 10);
    if (isNaN(stamps) || stamps <= 0) {
      Alert.alert('Invalid', 'Please enter a valid number of stamps (e.g. 10)');
      return;
    }

    setLoading(true);
    try {
      const response = await loyaltyCardApi.create({
        title: `${rewardName.trim()} Card`,
        reward: rewardName.trim(),
        totalStamps: stamps,
        description: description.trim() || `Earn ${stamps} stamps to get ${rewardName.trim()}`,
        backgroundColor: '#7B3FF2',
        textColor: '#FFFFFF',
      });

      if (response.success) {
        Alert.alert('Success', 'Reward created successfully!');
        onSave?.();
      } else {
        Alert.alert('Error', response.message || 'Failed to create reward');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to create reward');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialDesignIcons name="arrow-left" size={24} color="#1E293B" />
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
          {/* Card Visual Banner */}
          <View style={styles.rewardBanner}>
            <View style={styles.bannerIconCircle}>
              <MaterialDesignIcons name="gift" size={32} color="#7C3AED" />
            </View>
            <Text style={styles.bannerHeading}>
              {rewardName.trim() || 'New Customer Reward'}
            </Text>
            <Text style={styles.bannerSubtext}>
              {requiredStamps} Stamps Required
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reward Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Free Coffee, 20% Off, Free Dessert"
                placeholderTextColor="#94A3B8"
                value={rewardName}
                onChangeText={setRewardName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Required Stamps to Redeem</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 10"
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
                placeholder="Enter details or terms of the reward"
                placeholderTextColor="#94A3B8"
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

          {/* Save Button */}
          <PrimaryButton
            title="Save Reward"
            loading={loading}
            onPress={handleSave}
            style={styles.saveButton}
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
  rewardBanner: {
    height: 140,
    borderRadius: 18,
    backgroundColor: '#F5F3FF',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
  },
  bannerIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  bannerHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: '#7B3FF2',
    marginBottom: 2,
  },
  bannerSubtext: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
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
    marginTop: 10,
  },
});
