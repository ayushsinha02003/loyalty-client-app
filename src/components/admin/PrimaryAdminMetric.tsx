import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import PrimaryText from '../text/PrimaryText';
import { PALETTE, TYPOGRAPHY } from '../../constants/theme';

type Props = { label: string; value: string; change: string };

export default function PrimaryAdminMetric({ label, value, change }: Props) {
  return (
    <View style={styles.container}>
      <PrimaryText text={label} customStyle={styles.label} />
      <PrimaryText text={value} customStyle={styles.value} />
      <View style={styles.changeRow}>
        <TrendingUp size={11} strokeWidth={2} color={PALETTE.primary} />
        <PrimaryText text={change} customStyle={styles.change} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 4,
  },
  label: {
    ...TYPOGRAPHY.labelUppercase,
    fontSize: 10,
    color: PALETTE.onSurfaceMuted,
    textAlign: 'center',
  },
  value: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.surface,
    marginVertical: 6,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  change: {
    fontSize: 11,
    fontWeight: '700',
    color: PALETTE.primary,
  },
});
