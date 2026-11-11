import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Gift } from 'lucide-react-native';
import { loyaltyCardApi } from '../../../services/api';
import PrimaryButton from '../../../components/button/PrimaryButton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

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
        description:
          description.trim() ||
          `Earn ${stamps} stamps to get ${rewardName.trim()}`,
        backgroundColor: PALETTE.primary,
        textColor: PALETTE.onPrimary,
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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          activeOpacity={0.75}
        >
          <ArrowLeft size={20} strokeWidth={2} color={PALETTE.onSurface} />
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
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.rewardBanner}>
            <View style={styles.bannerIconCircle}>
              <Gift size={28} strokeWidth={2} color={PALETTE.primary} />
            </View>
            <Text style={styles.bannerHeading}>
              {rewardName.trim() || 'New Customer Reward'}
            </Text>
            <Text style={styles.bannerSubtext}>
              {requiredStamps} Stamps Required
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reward Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Free Coffee, 20% Off"
                placeholderTextColor={PALETTE.onSurfaceMuted}
                value={rewardName}
                onChangeText={setRewardName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Required Stamps</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 10"
                placeholderTextColor={PALETTE.onSurfaceMuted}
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
                placeholderTextColor={PALETTE.onSurfaceMuted}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

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
    backgroundColor: PALETTE.surfaceAlt,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 14,
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
  headerTitle: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  rewardBanner: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 24,
    alignItems: 'center',
    marginBottom: 22,
    ...SHADOWS.softCard,
  },
  bannerIconCircle: {
    width: 60,
    height: 60,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  bannerHeading: {
    ...TYPOGRAPHY.headlineMd,
    color: PALETTE.onSurface,
    textAlign: 'center',
  },
  bannerSubtext: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
    marginTop: 4,
  },
  formContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginLeft: 4,
  },
  input: {
    height: 54,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    paddingHorizontal: 20,
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
    ...SHADOWS.softCard,
  },
  saveButton: {
    marginTop: 26,
  },
});
