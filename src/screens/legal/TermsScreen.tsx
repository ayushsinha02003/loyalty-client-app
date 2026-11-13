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
import { ArrowLeft, FileText, ShieldCheck } from 'lucide-react-native';
import { PALETTE, RADII, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface TermsScreenProps {
  onBack?: () => void;
}

export default function TermsScreen({ onBack }: TermsScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      {/* Header */}
      <View style={styles.headerRow}>
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.8}
            style={styles.backButton}
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={20} color={PALETTE.onSurface} strokeWidth={2} />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerSpacer} />
        )}

        <View style={styles.headerCenter}>
          <Text style={styles.headerEyebrow}>LEGAL AGREEMENT</Text>
          <Text style={styles.headerTitle}>Terms of Service</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Badge Card */}
        <View style={styles.badgeCard}>
          <View style={styles.badgeIconCircle}>
            <FileText size={22} color={PALETTE.primary} strokeWidth={2} />
          </View>
          <View style={styles.badgeTextCol}>
            <Text style={styles.badgeTitle}>LoyaltyApp User Agreement</Text>
            <Text style={styles.badgeSubtitle}>
              Last updated: November 2026 • Valid for all users
            </Text>
          </View>
        </View>

        {/* Terms Sections */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By creating an account or using LoyaltyApp, you agree to comply with and be bound
            by these Terms of Service. If you do not agree to these terms, please do not use
            the app.
          </Text>

          <Text style={styles.sectionHeading}>2. Digital Loyalty Cards & Stamps</Text>
          <Text style={styles.paragraph}>
            Stamps are promotional digital markers awarded by participating merchants based on
            qualifying customer visits or purchases. Stamps have no monetary or cash value and
            cannot be transferred or sold to any other person.
          </Text>

          <Text style={styles.sectionHeading}>3. Rewards Redemption</Text>
          <Text style={styles.paragraph}>
            Reward terms, eligible items, and required stamp thresholds are established by each
            individual business. LoyaltyApp provides the digital platform and is not liable for
            discrepancies in merchant-fulfilled items or store policies.
          </Text>

          <Text style={styles.sectionHeading}>4. Prohibited Activities</Text>
          <Text style={styles.paragraph}>
            Users agree not to exploit bugs, duplicate QR codes, simulate automated scans, or
            engage in any fraudulent manipulation of stamp card balances. Accounts engaging in
            fraudulent activities will be terminated immediately.
          </Text>

          <Text style={styles.sectionHeading}>5. Account Deletion & Rights</Text>
          <Text style={styles.paragraph}>
            You may request deletion of your account and associated loyalty data at any time
            by emailing our support team at codestudiolabsupport@gmail.com. All personal
            records and stamps will be permanently removed.
          </Text>

          <Text style={styles.sectionHeading}>6. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            LoyaltyApp is provided on an &ldquo;as-is&rdquo; basis. We are not liable for any
            indirect, incidental, or consequential damages resulting from app downtime or
            merchant business closures.
          </Text>

          <View style={styles.highlightNotice}>
            <ShieldCheck size={20} color={PALETTE.primary} strokeWidth={2} />
            <Text style={styles.highlightText}>
              For inquiries, account deletion requests, or support, email us at
              codestudiolabsupport@gmail.com.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.gutter,
    paddingTop: 12,
    paddingBottom: 16,
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
  headerCenter: {
    alignItems: 'center',
  },
  headerEyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.primary,
    marginBottom: 2,
  },
  headerTitle: {
    ...TYPOGRAPHY.headlineMd,
  },
  headerSpacer: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: SPACING.gutter,
    paddingBottom: 40,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: SPACING.cardPadding,
    marginBottom: 16,
    ...SHADOWS.softCard,
  },
  badgeIconCircle: {
    width: 48,
    height: 48,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  badgeTextCol: {
    flex: 1,
  },
  badgeTitle: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onSurface,
    marginBottom: 2,
  },
  badgeSubtitle: {
    ...TYPOGRAPHY.caption,
  },
  card: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: SPACING.lg,
    ...SHADOWS.softCard,
  },
  sectionHeading: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
    marginTop: 16,
    marginBottom: 6,
  },
  paragraph: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
    lineHeight: 22,
  },
  highlightNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.illusCoralBg,
    borderRadius: RADII.lg,
    padding: 14,
    marginTop: 24,
    gap: 12,
  },
  highlightText: {
    flex: 1,
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
  },
});

