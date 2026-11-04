import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useBusinessProfile } from '../../../hooks/useApi';
import { AdminBusinessProfileScreenSkeleton } from '../../../components/skeleton';

interface AdminBusinessProfileScreenProps {
  onEdit?: () => void;
}

export default function AdminBusinessProfileScreen({
  onEdit,
}: AdminBusinessProfileScreenProps) {
  const { profile, loading, error } = useBusinessProfile();

  if (loading && !profile) {
    return <AdminBusinessProfileScreenSkeleton />;
  }

  const profileFields = [
    { label: 'Business Name', value: profile?.businessName || 'Your Business' },
    { label: 'Category', value: profile?.category || 'Retail' },
    { label: 'Address', value: profile?.address ? `${profile.address}, ${profile.city || ''}` : 'Not provided' },
    { label: 'Contact Number', value: profile?.phone || 'Not provided' },
    { label: 'Email', value: profile?.email || 'Not provided' },
    { label: 'Country', value: profile?.country || 'India' },
    { label: 'Status', value: profile?.isActive !== false ? 'Active' : 'Inactive' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Business Profile</Text>
        {onEdit ? (
          <TouchableOpacity
            onPress={onEdit}
            style={styles.editButton}
            activeOpacity={0.7}
          >
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7B3FF2" />
            <Text style={styles.loadingText}>Loading profile...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <>
            {/* Business Avatar & Branding */}
            <View style={styles.brandingCard}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoEmoji}>🏢</Text>
              </View>
              <Text style={styles.businessName}>
                {profile?.businessName || 'Your Business'}
              </Text>
              <Text style={styles.businessCategory}>
                {profile?.category || 'Retail Store'}
              </Text>
            </View>

            {/* Profile Field Details */}
            <View style={styles.fieldsContainer}>
              {profileFields.map((field, idx) => (
                <View key={idx} style={styles.fieldItem}>
                  <View style={styles.fieldInfo}>
                    <Text style={styles.fieldLabel}>{field.label}</Text>
                    <Text style={styles.fieldValue}>{field.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    fontSize: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  brandingCard: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  logoEmoji: {
    fontSize: 38,
  },
  businessName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  businessCategory: {
    fontSize: 14,
    color: '#7B3FF2',
    fontWeight: '600',
  },
  fieldsContainer: {
    marginTop: 8,
  },
  fieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  fieldInfo: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 3,
  },
  fieldValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#64748B',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
  },
});
