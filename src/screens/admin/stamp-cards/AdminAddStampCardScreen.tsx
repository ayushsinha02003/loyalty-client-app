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
import { ArrowLeft, Ticket } from 'lucide-react-native';
import { loyaltyCardApi } from '../../../services/api';
import PrimaryButton from '../../../components/button/PrimaryButton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

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
  const [totalStamps, setTotalStamps] = useState('10');
  const [reward, setReward] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!cardName.trim()) {
      Alert.alert('Required', 'Please enter a stamp card name');
      return;
    }

    if (!reward.trim()) {
      Alert.alert('Required', 'Please enter a reward');
      return;
    }

    const stamps = parseInt(totalStamps, 10);
    if (isNaN(stamps) || stamps <= 0) {
      Alert.alert('Invalid', 'Please enter a valid number of stamps (e.g. 10)');
      return;
    }

    setLoading(true);
    try {
      const response = await loyaltyCardApi.create({
        title: cardName.trim(),
        description: description.trim(),
        totalStamps: stamps,
        reward: reward.trim(),
        backgroundColor: PALETTE.primary,
        textColor: PALETTE.onPrimary,
      });

      if (response.success) {
        Alert.alert('Success', 'Stamp card created successfully!');
        onSave?.();
      } else {
        Alert.alert('Error', response.message || 'Failed to create stamp card');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to create stamp card');
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
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardBanner}>
            <View style={styles.bannerIconCircle}>
              <Ticket size={28} strokeWidth={2} color={PALETTE.primary} />
            </View>
            <Text style={styles.bannerHeading}>
              {cardName.trim() || 'New Stamp Card'}
            </Text>
            <Text style={styles.bannerSubtext}>
              {totalStamps} Stamps •{' '}
              {reward.trim() ? `Reward: ${reward.trim()}` : 'Custom Reward'}
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. VIP Coffee Club"
                placeholderTextColor={PALETTE.onSurfaceMuted}
                value={cardName}
                onChangeText={setCardName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Total Stamps to Complete</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 10"
                placeholderTextColor={PALETTE.onSurfaceMuted}
                keyboardType="number-pad"
                value={totalStamps}
                onChangeText={setTotalStamps}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reward Description</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Free Coffee, Free Pastry"
                placeholderTextColor={PALETTE.onSurfaceMuted}
                value={reward}
                onChangeText={setReward}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Details or terms for customers"
                placeholderTextColor={PALETTE.onSurfaceMuted}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

          <PrimaryButton
            title="Save Stamp Card"
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
  cardBanner: {
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
    textAlign: 'center',
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
