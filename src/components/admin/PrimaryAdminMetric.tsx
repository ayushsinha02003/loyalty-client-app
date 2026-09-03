import React from 'react';
import { StyleSheet, View } from 'react-native';
import PrimaryText from '../text/PrimaryText';

type Props = { label: string; value: string; change: string };

export default function PrimaryAdminMetric({ label, value, change }: Props) {
  return (
    <View style={styles.container}>
      <PrimaryText text={label} customStyle={styles.label} />
      <PrimaryText text={value} customStyle={styles.value} />
      <PrimaryText text={`↑ ${change}`} customStyle={styles.change} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.3)',
  },
  label: { color: '#F5F3FF', fontSize: 11, textAlign: 'center' },
  value: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginVertical: 7,
  },
  change: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
});
