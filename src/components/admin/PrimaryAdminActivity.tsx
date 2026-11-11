import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import PrimaryText from '../text/PrimaryText';
import { PALETTE, RADII, TYPOGRAPHY } from '../../constants/theme';

type Props = { title: string; detail: string; time: string };

export default function PrimaryAdminActivity({ title, detail, time }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.icon}>
        <Sparkles size={16} strokeWidth={2} color={PALETTE.primary} />
      </View>
      <View style={styles.copy}>
        <PrimaryText text={title} customStyle={styles.title} />
        <PrimaryText text={detail} customStyle={styles.detail} numberOfLines={2} />
      </View>
      <PrimaryText text={time} customStyle={styles.time} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: PALETTE.border,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onSurface,
  },
  detail: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    marginTop: 2,
  },
  time: {
    ...TYPOGRAPHY.caption,
    fontSize: 11,
    color: PALETTE.onSurfaceMuted,
  },
});
