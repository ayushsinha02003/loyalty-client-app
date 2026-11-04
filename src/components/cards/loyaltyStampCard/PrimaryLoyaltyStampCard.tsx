import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PrimaryText from '../../text/PrimaryText';

export interface PrimaryLoyaltyStampCardProps {
  merchantName: string;
  rewardText: string;
  currentStamps: number;
  totalStamps: number;
  merchantImage?: ImageSourcePropType;
  activeColor?: string;
  merchantIconBackground?: string;
  customStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  isRewardAvailable?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

const PrimaryLoyaltyStampCard = ({
  merchantName,
  rewardText,
  currentStamps,
  totalStamps = 10,
  merchantImage,
  activeColor = '#6D3DF5',
  merchantIconBackground = '#173D20',
  customStyle,
  onPress,
  isRewardAvailable = false,
  backgroundColor,
  textColor,
}: PrimaryLoyaltyStampCardProps) => {
  const safeTotalStamps = Math.max(totalStamps || 10, 1);
  const safeCurrentStamps = Math.min(
    Math.max(currentStamps || 0, 0),
    safeTotalStamps,
  );
  const stamps = Array.from(
    { length: safeTotalStamps },
    (_, index) => index + 1,
  );

  const cardActiveColor = backgroundColor || activeColor;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.card,
        customStyle,
        pressed && styles.cardPressed,
      ]}
    >
      {/* Merchant Information */}
      <View style={styles.header}>
        <View style={styles.merchantInfo}>
          {/* Merchant Logo */}
          <View
            style={[
              styles.merchantIcon,
              {
                backgroundColor: merchantIconBackground,
              },
            ]}
          >
            {merchantImage ? (
              <Image
                source={merchantImage}
                style={styles.merchantImage}
                resizeMode="contain"
              />
            ) : (
              <MaterialDesignIcons
                name="store-outline"
                size={22}
                color="#FFFFFF"
              />
            )}
          </View>

          {/* Name + Reward */}
          <View style={styles.merchantTextContainer}>
            <PrimaryText
              text={merchantName}
              customStyle={[styles.merchantName, textColor ? { color: textColor } : null]}
              numberOfLines={1}
            />
            <PrimaryText
              text={rewardText}
              customStyle={styles.rewardText}
              numberOfLines={1}
            />
          </View>
        </View>

        {/* Progress or Reward Ready Badge */}
        {isRewardAvailable ? (
          <View style={styles.rewardReadyBadge}>
            <PrimaryText text="Reward Ready! 🎁" customStyle={styles.rewardReadyText} />
          </View>
        ) : (
          <View
            style={[
              styles.progressBadge,
              {
                backgroundColor: `${cardActiveColor}18`,
              },
            ]}
          >
            <PrimaryText
              text={`${safeCurrentStamps} / ${safeTotalStamps}`}
              customStyle={[
                styles.progressText,
                {
                  color: cardActiveColor,
                },
              ]}
            />
          </View>
        )}
      </View>

      {/* Stamp Row */}
      <View style={styles.stampContainer}>
        {stamps.map(stampNumber => {
          const earned = stampNumber <= safeCurrentStamps;
          const isFinalReward = stampNumber === safeTotalStamps;

          return (
            <View
              key={stampNumber}
              style={[
                styles.stamp,
                earned
                  ? {
                      backgroundColor: cardActiveColor,
                      borderColor: cardActiveColor,
                    }
                  : styles.stampInactive,
                isFinalReward && !earned && styles.finalStampSlot,
              ]}
            >
              {earned ? (
                <MaterialDesignIcons
                  name={isFinalReward ? "gift" : "star"}
                  size={18}
                  color="#FFFFFF"
                />
              ) : isFinalReward ? (
                <MaterialDesignIcons
                  name="gift-outline"
                  size={16}
                  color="#9CA3AF"
                />
              ) : (
                <PrimaryText
                  text={stampNumber.toString()}
                  customStyle={styles.stampNumber}
                />
              )}
            </View>
          );
        })}
      </View>
    </Pressable>
  );
};

export default PrimaryLoyaltyStampCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#EEF0F4',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 12,
  },
  cardPressed: {
    opacity: 0.92,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  merchantInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  merchantIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  merchantImage: {
    width: 30,
    height: 30,
  },
  merchantTextContainer: {
    flex: 1,
  },
  merchantName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  rewardText: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  progressBadge: {
    minWidth: 52,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
  },
  rewardReadyBadge: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  rewardReadyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  stampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 8,
    width: '100%',
  },
  stamp: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  stampInactive: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  finalStampSlot: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  stampNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
});
