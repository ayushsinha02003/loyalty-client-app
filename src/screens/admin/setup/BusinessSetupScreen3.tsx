import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ArrowLeft,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Store,
} from 'lucide-react-native';
import { PrimaryButton, PrimaryCard } from '../../../components';
import {
  PALETTE,
  RADII,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from '../../../constants/theme';

interface BusinessSetupScreen3Props {
  onBack?: () => void;
  onEdit?: () => void;
  onCreateBusiness?: () => void;
  businessName?: string;
  category?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export default function BusinessSetupScreen3({
  onBack,
  onEdit,
  onCreateBusiness,
  businessName = 'Brew & Beans',
  category = 'Coffee Shop',
  address = '123, MG Road, Indore, MP',
  phone = '+91 98765 43210',
  email = 'business@email.com',
}: BusinessSetupScreen3Props) {
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.8}
            style={styles.backButton}
            accessibilityLabel="Go back"
          >
            <ArrowLeft
              size={20}
              color={PALETTE.onSurface}
              strokeWidth={2}
            />
          </TouchableOpacity>

          <View style={styles.stepper}>
            <View style={[styles.stepDot, styles.stepActive]} />
            <View style={[styles.stepLine, styles.stepActive]} />
            <View style={[styles.stepDot, styles.stepActive]} />
            <View style={[styles.stepLine, styles.stepActive]} />
            <View style={[styles.stepPill, styles.stepActive]} />
          </View>

          <View style={styles.topSpacer} />
        </View>

        <View style={styles.headerBlock}>
          <Text style={styles.eyebrow}>STEP 3 OF 3</Text>
          <Text style={styles.title}>Review & Launch</Text>
          <Text style={styles.subtitle}>
            Confirm your store profile before launching your loyalty cards.
          </Text>
        </View>

        <PrimaryCard style={styles.previewCard}>
          <View style={styles.cardHeader}>
            <View style={styles.storeIconCircle}>
              <Store size={24} color={PALETTE.primary} strokeWidth={2} />
            </View>
            <View style={styles.cardHeaderInfo}>
              <Text style={styles.businessName}>{businessName}</Text>
              <Text style={styles.businessCategory}>{category}</Text>
            </View>
            <TouchableOpacity
              onPress={onEdit}
              activeOpacity={0.8}
              style={styles.editButton}
              accessibilityLabel="Edit business details"
            >
              <Pencil size={16} color={PALETTE.primary} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.detailIconWell}>
              <MapPin size={16} color={PALETTE.primary} strokeWidth={2} />
            </View>
            <Text style={styles.detailText}>{address}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIconWell}>
              <Phone size={16} color={PALETTE.primary} strokeWidth={2} />
            </View>
            <Text style={styles.detailText}>{phone}</Text>
          </View>

          <View style={[styles.detailRow, styles.lastDetailRow]}>
            <View style={styles.detailIconWell}>
              <Mail size={16} color={PALETTE.primary} strokeWidth={2} />
            </View>
            <Text style={styles.detailText}>{email}</Text>
          </View>
        </PrimaryCard>

        <View style={styles.footer}>
          <PrimaryButton title="Create Business" onPress={onCreateBusiness} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.gutter,
    paddingTop: 20,
    paddingBottom: 36,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
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
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepPill: {
    width: 24,
    height: 8,
    borderRadius: RADII.full,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.border,
  },
  stepLine: {
    width: 20,
    height: 2,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.border,
    marginHorizontal: 6,
  },
  stepActive: {
    backgroundColor: PALETTE.primary,
  },
  topSpacer: {
    width: 44,
  },
  headerBlock: {
    marginBottom: 24,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.primary,
    marginBottom: 8,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    marginBottom: 8,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
  },
  previewCard: {
    padding: SPACING.lg,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeIconCircle: {
    width: 56,
    height: 56,
    borderRadius: RADII.lg,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderInfo: {
    flex: 1,
    marginLeft: 14,
  },
  businessName: {
    ...TYPOGRAPHY.headlineLg,
    marginBottom: 4,
  },
  businessCategory: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surfaceAlt,
    borderWidth: 1,
    borderColor: PALETTE.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: PALETTE.border,
    marginVertical: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  lastDetailRow: {
    marginBottom: 0,
  },
  detailIconWell: {
    width: 34,
    height: 34,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  detailText: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
    flex: 1,
  },
  footer: {
    marginTop: 'auto',
  },
});
