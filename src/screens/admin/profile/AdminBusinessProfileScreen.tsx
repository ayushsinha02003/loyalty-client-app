import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
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

  const profileFields: Array<{
    label: string;
    value: string;
    icon: React.ComponentProps<typeof MaterialDesignIcons>['name'];
    color: string;
    bgColor: string;
  }> = [
    {
      label: 'Business Name',
      value: profile?.businessName || 'Your Business',
      icon: 'storefront-outline',
      color: '#7C3AED',
      bgColor: '#EDE9FE',
    },
    {
      label: 'Category',
      value: profile?.category || 'Retail',
      icon: 'shape-outline',
      color: '#0284C7',
      bgColor: '#E0F2FE',
    },
    {
      label: 'Location Address',
      value: profile?.address ? `${profile.address}, ${profile.city || ''}` : 'Not provided',
      icon: 'map-marker-outline',
      color: '#EA580C',
      bgColor: '#FFEDD5',
    },
    {
      label: 'Contact Number',
      value: profile?.phone || 'Not provided',
      icon: 'phone-outline',
      color: '#10B981',
      bgColor: '#D1FAE5',
    },
    {
      label: 'Email Address',
      value: profile?.email || 'Not provided',
      icon: 'email-outline',
      color: '#6366F1',
      bgColor: '#EEF2FF',
    },
    {
      label: 'Account Status',
      value: profile?.isActive !== false ? 'Active' : 'Inactive',
      icon: 'shield-check-outline',
      color: '#059669',
      bgColor: '#ECFDF5',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Business Profile</Text>
          <Text style={styles.subtitle}>Store details and customer-facing info</Text>
        </View>

        {onEdit ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={onEdit}
            activeOpacity={0.7}
          >
            <MaterialDesignIcons name="pencil-outline" size={18} color="#7C3AED" />
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {error ? (
          <View style={styles.errorContainer}>
            <MaterialDesignIcons name="alert-circle-outline" size={40} color="#EF4444" style={styles.mb8} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <>
            {/* Business Avatar & Branding Card */}
            <View style={styles.brandingCard}>
              <View style={styles.logoCircle}>
                <MaterialDesignIcons name="storefront" size={38} color="#7C3AED" />
              </View>
              <Text style={styles.businessName}>
                {profile?.businessName || 'Your Business'}
              </Text>
              <View style={styles.categoryBadge}>
                <MaterialDesignIcons name="tag-outline" size={12} color="#7C3AED" style={styles.mr4} />
                <Text style={styles.businessCategory}>
                  {profile?.category || 'Retail Store'}
                </Text>
              </View>
            </View>

            {/* Profile Field Details */}
            <View style={styles.fieldsContainer}>
              {profileFields.map((field, idx) => (
                <View key={idx} style={styles.fieldItem}>
                  <View style={[styles.fieldIconBox, { backgroundColor: field.bgColor }]}>
                    <MaterialDesignIcons name={field.icon} size={20} color={field.color} />
                  </View>
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
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  brandingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
  },
  businessName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  businessCategory: {
    fontSize: 13,
    color: '#7C3AED',
    fontWeight: '600',
  },
  fieldsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  fieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  fieldIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  fieldInfo: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 2,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
  },
  mr4: { marginRight: 4 },
  mb8: { marginBottom: 8 },
});
