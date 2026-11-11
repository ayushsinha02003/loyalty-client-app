import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check, Gift, Heart, Star } from 'lucide-react-native';
import PrimaryButton from '../../components/button/PrimaryButton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

interface RewardDetailsScreenProps {
  title?: string;
  stampsCost?: number;
  description?: string;
  imageUrl?: string;
  validityDays?: number;
  onBack?: () => void;
  onRedeem?: () => void;
}

export default function RewardDetailsScreen({
  title = 'Free Coffee',
  stampsCost = 10,
  description = 'Enjoy any handcrafted drink on us. Valid in all participating branches.',
  imageUrl,
  validityDays = 30,
  onBack,
  onRedeem,
}: RewardDetailsScreenProps) {
  const [liked, setLiked] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      {/* Top Navigation Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.headerButton}
          activeOpacity={0.75}
          accessibilityLabel="Back"
        >
          <ArrowLeft size={20} strokeWidth={2} color={PALETTE.onSurface} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Reward Details</Text>

        <TouchableOpacity
          style={styles.headerButton}
          activeOpacity={0.75}
          onPress={() => setLiked(prev => !prev)}
          accessibilityLabel="Favorite"
        >
          <Heart
            size={20}
            strokeWidth={2}
            color={PALETTE.primary}
            fill={liked ? PALETTE.primary : 'none'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.imageCard}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.heroFallback}>
              <View style={styles.heroIconWell}>
                <Gift size={42} strokeWidth={2} color={PALETTE.primary} />
              </View>
              <Text style={styles.heroCaption}>Reward Voucher</Text>
            </View>
          )}
        </View>

        {/* Title & Cost Badge */}
        <View style={styles.detailsCard}>
          <View style={styles.costBadge}>
            <Star
              size={14}
              strokeWidth={2}
              color={PALETTE.warning}
              fill={PALETTE.warning}
            />
            <Text style={styles.costBadgeText}>{stampsCost} Stamps</Text>
          </View>

          <Text style={styles.rewardTitle}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>

          {/* Terms & Conditions */}
          <View style={styles.termsSection}>
            <Text style={styles.termsEyebrow}>Terms & Usage</Text>

            {[
              `Valid for ${validityDays} days after unlocking`,
              'One-time use per redemption',
              'Cannot be combined with other promo offers',
            ].map(rule => (
              <View key={rule} style={styles.termItem}>
                <View style={styles.termIconCircle}>
                  <Check size={12} strokeWidth={2.5} color={PALETTE.primary} />
                </View>
                <Text style={styles.termText}>{rule}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <PrimaryButton title="Redeem Now" onPress={onRedeem || (() => {})} />
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  headerTitle: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
  },
  headerButton: {
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
    paddingBottom: 130,
    gap: 18,
  },
  imageCard: {
    marginTop: 4,
    borderRadius: RADII.xl,
    overflow: 'hidden',
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    ...SHADOWS.softCard,
  },
  heroImage: {
    width: '100%',
    height: 210,
  },
  heroFallback: {
    height: 200,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  heroIconWell: {
    width: 84,
    height: 84,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.softCard,
  },
  heroCaption: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
  },
  detailsCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 22,
    ...SHADOWS.softCard,
  },
  costBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PALETTE.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADII.sm,
    marginBottom: 12,
  },
  costBadgeText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onSurface,
  },
  rewardTitle: {
    ...TYPOGRAPHY.displayMd,
    fontSize: 26,
    lineHeight: 32,
    color: PALETTE.onSurface,
    marginBottom: 8,
  },
  descriptionText: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
  },
  termsSection: {
    marginTop: 22,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: PALETTE.border,
    gap: 12,
  },
  termsEyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 4,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  termIconCircle: {
    width: 24,
    height: 24,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
    flex: 1,
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: PALETTE.surfaceAlt,
  },
});
