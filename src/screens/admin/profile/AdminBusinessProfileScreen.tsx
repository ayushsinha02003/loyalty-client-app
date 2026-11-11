import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AlertCircle,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Store,
  Tag,
} from 'lucide-react-native';
import { useBusinessProfile } from '../../../hooks/useApi';
import { AdminBusinessProfileScreenSkeleton } from '../../../components/skeleton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

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
    {
      label: 'Business Name',
      value: profile?.businessName || 'Your Business',
      Icon: Store,
    },
    {
      label: 'Category',
      value: profile?.category || 'Retail',
      Icon: Tag,
    },
    {
      label: 'Location Address',
      value: profile?.address
        ? `${profile.address}${profile.city ? `, ${profile.city}` : ''}`
        : 'Not provided',
      Icon: MapPin,
    },
    {
      label: 'Contact Number',
      value: profile?.phone || 'Not provided',
      Icon: Phone,
    },
    {
      label: 'Email Address',
      value: profile?.email || 'Not provided',
      Icon: Mail,
    },
    {
      label: 'Account Status',
      value: profile?.isActive !== false ? 'Active' : 'Inactive',
      Icon: ShieldCheck,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Merchant Identity</Text>
          <Text style={styles.title}>Business Profile</Text>
          <Text style={styles.subtitle}>
            Store details and customer-facing info
          </Text>
        </View>

        {onEdit ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={onEdit}
            activeOpacity={0.75}
            accessibilityLabel="Edit Business Profile"
          >
            <Pencil size={18} strokeWidth={2} color={PALETTE.primary} />
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {error ? (
          <View style={styles.errorCard}>
            <AlertCircle size={36} strokeWidth={2} color={PALETTE.primary} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <>
            <View style={styles.brandingCard}>
              <View style={styles.logoCircle}>
                <Store size={32} strokeWidth={2} color={PALETTE.primary} />
              </View>
              <Text style={styles.businessName}>
                {profile?.businessName || 'Your Business'}
              </Text>
              <View style={styles.categoryBadge}>
                <Tag size={12} strokeWidth={2} color={PALETTE.primary} />
                <Text style={styles.businessCategory}>
                  {profile?.category || 'Retail Store'}
                </Text>
              </View>
            </View>

            <View style={styles.fieldsContainer}>
              {profileFields.map(({ label, value, Icon }, idx) => (
                <View key={idx} style={styles.fieldItem}>
                  <View style={styles.fieldIconBox}>
                    <Icon size={18} strokeWidth={2} color={PALETTE.primary} />
                  </View>
                  <View style={styles.fieldInfo}>
                    <Text style={styles.fieldLabel}>{label}</Text>
                    <Text style={styles.fieldValue}>{value}</Text>
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
    backgroundColor: PALETTE.surfaceAlt,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 14,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 4,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    fontSize: 28,
    lineHeight: 34,
    color: PALETTE.onSurface,
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    marginTop: 2,
  },
  editButton: {
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    gap: 18,
  },
  brandingCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 24,
    alignItems: 'center',
    ...SHADOWS.softCard,
  },
  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  businessName: {
    ...TYPOGRAPHY.headlineLg,
    color: PALETTE.onSurface,
    textAlign: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PALETTE.surfaceContrast,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADII.full,
  },
  businessCategory: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 12,
    color: PALETTE.surface,
  },
  fieldsContainer: {
    gap: 10,
  },
  fieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 16,
    ...SHADOWS.softCard,
  },
  fieldIconBox: {
    width: 42,
    height: 42,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  fieldInfo: {
    flex: 1,
  },
  fieldLabel: {
    ...TYPOGRAPHY.labelUppercase,
    fontSize: 10,
    color: PALETTE.onSurfaceVariant,
  },
  fieldValue: {
    ...TYPOGRAPHY.labelMd,
    fontSize: 15,
    color: PALETTE.onSurface,
    marginTop: 2,
  },
  errorCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 28,
    alignItems: 'center',
    gap: 12,
    ...SHADOWS.softCard,
  },
  errorText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
    textAlign: 'center',
  },
});
