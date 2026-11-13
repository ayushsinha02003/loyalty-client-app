import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { Check, Gift, Star } from 'lucide-react-native';
import PrimaryButton from '../../components/button/PrimaryButton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';
import { notifyStampEarned } from '../../services/nativeNotification';

interface ScanSuccessScreenProps {
  businessName?: string;
  stampsEarned?: number;
  currentStamps?: number;
  totalStamps?: number;
  onViewCard?: () => void;
  onDone?: () => void;
}

export default function ScanSuccessScreen({
  businessName = 'Brew & Beans',
  stampsEarned = 1,
  currentStamps = 8,
  totalStamps = 10,
  onViewCard,
  onDone,
}: ScanSuccessScreenProps) {
  useEffect(() => {
    notifyStampEarned(businessName, currentStamps, totalStamps).catch(() => {});
  }, [businessName, currentStamps, totalStamps]);
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <View style={styles.content}>
        <View style={styles.topGroup}>
          <View style={styles.successIconBadge}>
            <Check size={28} strokeWidth={2.5} color={PALETTE.onPrimary} />
          </View>

          <Text style={styles.title}>Stamp Added!</Text>
          <Text style={styles.subtitle}>
            You earned +{stampsEarned}{' '}
            {stampsEarned === 1 ? 'stamp' : 'stamps'}
          </Text>
        </View>

        {/* Central Celebratory Graphic */}
        <View style={styles.illustrationWrapper}>
          <Svg width={220} height={180} viewBox="0 0 200 180">
            <Circle cx="30" cy="35" r="4" fill={PALETTE.warning} />
            <Circle cx="170" cy="40" r="3.5" fill={PALETTE.primary} />
            <Circle cx="45" cy="110" r="3" fill={PALETTE.illusWarmYellow} />
            <Circle cx="165" cy="120" r="4" fill={PALETTE.illusWarmOrange} />
            <Rect
              x="20"
              y="70"
              width="8"
              height="4"
              rx="2"
              fill={PALETTE.primary}
              transform="rotate(25 20 70)"
            />
            <Rect
              x="175"
              y="75"
              width="8"
              height="4"
              rx="2"
              fill={PALETTE.warning}
              transform="rotate(-30 175 75)"
            />
            <Rect
              x="50"
              y="145"
              width="7"
              height="3.5"
              rx="1.5"
              fill={PALETTE.surfaceContrast}
              transform="rotate(45 50 145)"
            />
            <Rect
              x="150"
              y="150"
              width="8"
              height="4"
              rx="2"
              fill={PALETTE.primary}
              transform="rotate(-20 150 150)"
            />

            <Circle cx="100" cy="90" r="58" fill={PALETTE.illusCoralBg} />
            <Circle cx="100" cy="90" r="46" fill={PALETTE.surfaceContrast} />

            {/* Stylized Cup */}
            <Path
              d="M80 78 L84 104 C84 110 88 114 94 114 L106 114 C112 114 116 110 116 104 L120 78 Z"
              fill={PALETTE.surface}
            />
            <Path
              d="M120 83 C127 83 129 93 120 95"
              stroke={PALETTE.surface}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <Path
              d="M92 72 Q94 65 92 60"
              stroke={PALETTE.primary}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <Path
              d="M100 70 Q102 63 100 58"
              stroke={PALETTE.warning}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <Path
              d="M108 72 Q110 65 108 60"
              stroke={PALETTE.primary}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </Svg>

          <View style={styles.stampPill}>
            <Star
              size={12}
              strokeWidth={2}
              color={PALETTE.warning}
              fill={PALETTE.warning}
            />
            <Text style={styles.stampPillText}>+{stampsEarned} Stamp</Text>
          </View>
        </View>

        {/* Card Progress Summary Box */}
        <View style={styles.cardSummaryBox}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardName} numberOfLines={1}>
              {businessName}
            </Text>
            <Text style={styles.cardProgressCount}>
              {currentStamps}/{totalStamps}
            </Text>
          </View>

          <View style={styles.stampDotsRow}>
            {Array.from({ length: totalStamps }).map((_, idx) => {
              const isFilled = idx < currentStamps;
              const isLast = idx === totalStamps - 1;
              return (
                <View
                  key={idx}
                  style={[
                    styles.stampDot,
                    isFilled && styles.stampDotFilled,
                    isLast && styles.stampDotGift,
                  ]}
                >
                  {isLast ? (
                    <Gift
                      size={14}
                      strokeWidth={2}
                      color={isFilled ? PALETTE.onPrimary : PALETTE.primary}
                    />
                  ) : isFilled ? (
                    <Star
                      size={13}
                      strokeWidth={2}
                      color={PALETTE.onPrimary}
                      fill={PALETTE.onPrimary}
                    />
                  ) : null}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton title="View Card" onPress={onViewCard || (() => {})} />

          <TouchableOpacity
            style={styles.doneButton}
            onPress={onDone}
            activeOpacity={0.8}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  topGroup: {
    alignItems: 'center',
  },
  successIconBadge: {
    width: 60,
    height: 60,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    ...SHADOWS.btn,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.onSurface,
    marginTop: 14,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: PALETTE.onSurfaceVariant,
    marginTop: 4,
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PALETTE.surfaceContrast,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADII.full,
    marginTop: -8,
  },
  stampPillText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.surface,
  },
  cardSummaryBox: {
    width: '100%',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 20,
    ...SHADOWS.softCard,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardName: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
    flex: 1,
    marginRight: 10,
  },
  cardProgressCount: {
    ...TYPOGRAPHY.labelSm,
    fontWeight: '800',
    color: PALETTE.primary,
  },
  stampDotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  stampDot: {
    width: 30,
    height: 30,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surfaceAlt,
    borderWidth: 1.5,
    borderColor: PALETTE.illusNeutralCream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampDotFilled: {
    backgroundColor: PALETTE.primary,
    borderColor: PALETTE.primary,
  },
  stampDotGift: {
    borderColor: PALETTE.primary,
    backgroundColor: PALETTE.illusCoralBg,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  doneButton: {
    height: 50,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneText: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onSurface,
  },
});
