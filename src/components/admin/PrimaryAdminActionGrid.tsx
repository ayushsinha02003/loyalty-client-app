import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PrimaryText from '../text/PrimaryText';

type Action = {
  label: string;
  icon: React.ComponentProps<typeof MaterialDesignIcons>['name'];
};

export default function PrimaryAdminActionGrid({
  actions,
}: {
  actions: Action[];
}) {
  return (
    <View style={styles.grid}>
      {actions.map(action => (
        <TouchableOpacity
          key={action.label}
          style={styles.action}
          activeOpacity={0.8}
        >
          <View style={styles.icon}>
            <MaterialDesignIcons name={action.icon} size={26} color="#7B3FF2" />
          </View>
          <PrimaryText text={action.label} customStyle={styles.label} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', gap: 10 },
  action: {
    flex: 1,
    minHeight: 112,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    elevation: 2,
  },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F0E9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
  },
  label: {
    fontSize: 11,
    color: '#334155',
    textAlign: 'center',
    fontWeight: '700',
  },
});
