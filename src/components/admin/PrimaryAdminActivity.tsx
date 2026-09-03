import React from 'react';
import { StyleSheet, View } from 'react-native';
import PrimaryText from '../text/PrimaryText';

type Props = { title: string; detail: string; time: string };

export default function PrimaryAdminActivity({ title, detail, time }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.icon} />
      <View style={styles.copy}>
        <PrimaryText text={title} customStyle={styles.title} />
        <PrimaryText text={detail} customStyle={styles.detail} />
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
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  icon: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#F0E9FF' },
  copy: { flex: 1, marginLeft: 10 },
  title: { color: '#172033', fontSize: 13, fontWeight: '800' },
  detail: { color: '#64748B', fontSize: 11, marginTop: 3 },
  time: { color: '#64748B', fontSize: 11 },
});
