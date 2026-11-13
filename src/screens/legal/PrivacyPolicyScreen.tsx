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
import { ArrowLeft, Camera, Shield, Trash2 } from 'lucide-react-native';
import { PALETTE, RADII, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface PrivacyPolicyScreenProps {
  onBack?: () => void;
}

export default function PrivacyPolicyScreen({ onBack }: PrivacyPolicyScreenProps) {
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
          <Text style={styles.headerEyebrow}>DATA SAFETY & PRIVACY</Text>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
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
            <Shield size={22} color={PALETTE.primary} strokeWidth={2} />
          </View>
          <View style={styles.badgeTextCol}>
            <Text style={styles.badgeTitle}>Your Privacy Matters</Text>
            <Text style={styles.badgeSubtitle}>
              Transparent data protection • Google Play Compliant
            </Text>
          </View>
        </View>

        {/* Content Card */}
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            We collect basic profile details including your name, mobile phone number, and
            optional email address to create your loyalty wallet and protect your stamps.
          </Text>

          {/* Camera Permission Highlight */}
          <View style={styles.highlightCard}>
            <View style={styles.highlightHeader}>
              <Camera size={18} color={PALETTE.primary} strokeWidth={2} />
              <Text style={styles.highlightTitle}>Camera Permission Usage</Text>
            </View>
            <Text style={styles.highlightBody}>
              LoyaltyApp requires camera access exclusively to scan merchant QR codes when
              earning stamps or claiming rewards. The camera feed is evaluated in real time
              on your device. We never capture, record, or upload camera photos or videos.
            </Text>
          </View>

          <Text style={styles.sectionHeading}>2. How We Use Data</Text>
          <Text style={styles.paragraph}>
            Your data is used solely to maintain your active stamp cards, verify rewards at
            participating stores, and prevent fraudulent redemptions. We never sell your
            personal data to advertisers or third-party brokers.
          </Text>

          <Text style={styles.sectionHeading}>3. Data Security & Storage</Text>
          <Text style={styles.paragraph}>
            All network communication with our servers is encrypted in transit using industry-standard
            Transport Layer Security (TLS/HTTPS). Passwords are encrypted using bcrypt hashing.
          </Text>

          {/* Account Deletion Highlight */}
          <View style={styles.highlightCard}>
            <View style={styles.highlightHeader}>
              <Trash2 size={18} color={PALETTE.primary} strokeWidth={2} />
              <Text style={styles.highlightTitle}>Right to Delete Account & Data</Text>
            </View>
            <Text style={styles.highlightBody}>
              You have complete ownership of your data. You can delete your account at any time
              by navigating to Profile &rarr; Delete Account. Deleting your account permanently
              removes your profile, stamp cards, and transaction records from our servers.
            </Text>
          </View>

          <Text style={styles.sectionHeading}>4. Third-Party Services</Text>
          <Text style={styles.paragraph}>
            We rely on trusted cloud infrastructure providers (MongoDB Atlas and cloud hosting)
            to securely store your loyalty wallet data under strict confidentiality obligations.
          </Text>

          <Text style={styles.sectionHeading}>5. Contact & Inquiries</Text>
          <Text style={styles.paragraph}>
            If you have questions about our privacy practices, contact us at:
            {'\n'}support@loyaltyapp.com
          </Text>
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
  highlightCard: {
    backgroundColor: PALETTE.illusCoralBg,
    borderRadius: RADII.lg,
    padding: 16,
    marginVertical: 14,
  },
  highlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  highlightTitle: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.primary,
  },
  highlightBody: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
    lineHeight: 20,
  },
});

