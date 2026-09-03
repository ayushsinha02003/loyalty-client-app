import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import PrimaryText from '../text/PrimaryText';

type PrimaryRoleButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export default function PrimaryRoleButton({
  label,
  active,
  onPress,
}: PrimaryRoleButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, active && styles.activeButton]}
      onPress={onPress}
    >
      <PrimaryText
        text={label}
        customStyle={[styles.text, active && styles.activeText]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    borderColor: '#7B3FF2',
    backgroundColor: '#F3EEFF',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
  activeText: {
    color: '#7B3FF2',
  },
});
