import React from 'react';
import { StyleSheet, View } from 'react-native';
import PrimaryText from '../text/PrimaryText';

type Props = { label: string; value: string; change: string; color: string };

export default function PrimaryAdminStatCard({
  label,
  value,
  change,
  color,
}: Props) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <PrimaryText text={label} customStyle={styles.label} />
      <PrimaryText text={value} customStyle={styles.value} />
      <PrimaryText text={`↑ ${change}`} customStyle={styles.change} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, borderRadius: 16, padding: 14, minHeight: 126 },
  label: { color: '#64748B', fontSize: 11, fontWeight: '600' },
  value: { color: '#172033', fontSize: 26, fontWeight: '800', marginTop: 10 },
  change: { color: '#16A34A', fontSize: 12, fontWeight: '700', marginTop: 4 },
});
