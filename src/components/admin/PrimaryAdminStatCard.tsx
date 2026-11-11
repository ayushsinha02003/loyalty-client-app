import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Star } from 'lucide-react-native';
import PrimaryText from '../text/PrimaryText';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

type Props = { label: string; value: string; change: string; color?: string };

export default function PrimaryAdminStatCard({
  label,
  value,
  change,
}: Props) {
  return (
    <View style={styles.card}>
      <PrimaryText text={label} customStyle={styles.label} numberOfLines={1} />
      <PrimaryText text={value} customStyle={styles.value} />
      <View style={styles.changeChip}>
        <Star
          size={11}
          strokeWidth={2}
          color={PALETTE.warning}
          fill={PALETTE.warning}
        />
        <PrimaryText text={change} customStyle={styles.change} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: RADII.lg,
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 14,
    minHeight: 122,
    justifyContent: 'space-between',
    ...SHADOWS.softCard,
  },
  label: {
    ...TYPOGRAPHY.labelUppercase,
    fontSize: 10,
    color: PALETTE.onSurfaceVariant,
  },
  value: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: PALETTE.onSurface,
    marginTop: 8,
  },
  changeChip: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: PALETTE.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADII.sm,
    marginTop: 8,
  },
  change: {
    fontSize: 11,
    fontWeight: '700',
    color: PALETTE.onSurface,
  },
});
