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
import { loyaltyCardApi } from '../../../services/api';
import PrimaryButton from '../../../components/button/PrimaryButton';

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
        backgroundColor: '#7B3FF2',
        textColor: '#FFFFFF',
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
          {/* Card Visual Banner */}
          <View style={styles.cardBanner}>
            <Text style={styles.bannerEmoji}>🎫</Text>
            <Text style={styles.bannerHeading}>
              {cardName.trim() || 'New Stamp Card'}
            </Text>
            <Text style={styles.bannerSubtext}>
              {totalStamps} Stamps • {reward.trim() ? `Reward: ${reward.trim()}` : 'Custom Reward'}
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. VIP Coffee Club, Lunch Card"
                placeholderTextColor="#94A3B8"
                value={cardName}
                onChangeText={setCardName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Total Stamps to Complete</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 10 (or 5, 8, 12)"
                placeholderTextColor="#94A3B8"
                keyboardType="number-pad"
                value={totalStamps}
                onChangeText={setTotalStamps}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reward Description</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Free Coffee, Free Pastry, 50% Off"
                placeholderTextColor="#94A3B8"
                value={reward}
                onChangeText={setReward}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Instructions or details for customers"
                placeholderTextColor="#94A3B8"
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

          {/* Save Button */}
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
  cardBanner: {
    height: 140,
    borderRadius: 18,
    backgroundColor: '#F5F3FF',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
  },
  bannerEmoji: {
    fontSize: 32,
    marginBottom: 4,
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
