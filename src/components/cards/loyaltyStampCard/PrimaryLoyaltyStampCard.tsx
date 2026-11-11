import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Check, Gift, Sparkles, Star, Store } from 'lucide-react-native';
import PrimaryText from '../../text/PrimaryText';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

export interface PrimaryLoyaltyStampCardProps {
  merchantName: string;
  rewardText: string;
  currentStamps: number;
  totalStamps: number;
  isRewardAvailable?: boolean;
  backgroundColor?: string;
  textColor?: string;
  customStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const PrimaryLoyaltyStampCard = ({
  merchantName,
  rewardText,
  currentStamps,
  totalStamps,
  isRewardAvailable = false,
  customStyle,
  onPress,
}: PrimaryLoyaltyStampCardProps) => {
  const safeTotal = Math.max(totalStamps, 1);
  const clampedStamps = Math.min(Math.max(currentStamps, 0), safeTotal);
  const remaining = Math.max(safeTotal - clampedStamps, 0);
  const rewardReady = isRewardAvailable || remaining === 0;
  const stamps = Array.from({ length: safeTotal }, (_, i) => i < clampedStamps);

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[styles.card, customStyle]}
      {...(onPress ? { activeOpacity: 0.9, onPress } : {})}
    >
      <View style={styles.headerRow}>
        <View style={[styles.storeAvatar, rewardReady && styles.storeAvatarReady]}>
          {rewardReady ? (
            <Gift size={22} strokeWidth={2} color={PALETTE.surface} />
          ) : (
            <Store size={22} strokeWidth={2} color={PALETTE.primary} />
          )}
        </View>

        <View style={styles.headerInfo}>
          <PrimaryText
            text={merchantName}
            customStyle={styles.merchantName}
            numberOfLines={1}
          />
          <View style={styles.rewardRow}>
            <Gift size={13} strokeWidth={2} color={PALETTE.primary} />
            <PrimaryText
              text={rewardText}
              customStyle={styles.rewardText}
              numberOfLines={1}
            />
          </View>
        </View>

        <View style={styles.statBadge}>
          <Star
            size={13}
            strokeWidth={2}
            color={PALETTE.warning}
            fill={PALETTE.warning}
          />
          <PrimaryText
            text={`${clampedStamps}/${safeTotal}`}
            customStyle={styles.statBadgeText}
          />
        </View>
      </View>

      <View style={styles.stampGrid}>
        {stamps.map((earned, index) => (
          <View
            key={index}
            style={[
              styles.stampSlot,
              earned ? styles.stampSlotEarned : styles.stampSlotEmpty,
            ]}
          >
            {earned ? (
              <Check size={15} strokeWidth={2.5} color={PALETTE.surface} />
            ) : (
              <View style={styles.stampEmptyDot} />
            )}
          </View>
        ))}
      </View>

      <View style={styles.footerRow}>
        <PrimaryText
          text={
            rewardReady
              ? 'Reward unlocked — show in store'
              : `${remaining} more ${remaining === 1 ? 'stamp' : 'stamps'} to reward`
          }
          customStyle={styles.footerLabel}
          numberOfLines={1}
        />

        <View style={styles.statusPill}>
          <Sparkles size={12} strokeWidth={2} color={PALETTE.primary} />
          <PrimaryText
            text={rewardReady ? 'Ready' : 'Active'}
            customStyle={styles.statusPillText}
          />
        </View>
      </View>
    </Wrapper>
  );
};

export default PrimaryLoyaltyStampCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 20,
    marginBottom: 16,
    ...SHADOWS.softCard,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeAvatar: {
    width: 48,
    height: 48,
    borderRadius: RADII.lg,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  storeAvatarReady: {
    backgroundColor: PALETTE.surfaceContrast,
  },
  headerInfo: {
    flex: 1,
    marginRight: 10,
  },
  merchantName: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  rewardText: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    flex: 1,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: PALETTE.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADII.sm,
  },
  statBadgeText: {
    ...TYPOGRAPHY.labelSm,
    fontWeight: '800',
    color: PALETTE.onSurface,
  },
  stampGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: PALETTE.border,
  },
  stampSlot: {
    width: 34,
    height: 34,
    borderRadius: RADII.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampSlotEarned: {
    backgroundColor: PALETTE.primary,
  },
  stampSlotEmpty: {
    backgroundColor: PALETTE.surfaceAlt,
    borderWidth: 1.5,
    borderColor: PALETTE.illusNeutralCream,
  },
  stampEmptyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: PALETTE.onSurfaceMuted,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 10,
  },
  footerLabel: {
    flex: 1,
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: PALETTE.surfaceContrast,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADII.full,
  },
  statusPillText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.surface,
  },
});
