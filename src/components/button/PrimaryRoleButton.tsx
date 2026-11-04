import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PrimaryText from '../text/PrimaryText';

type PrimaryRoleButtonProps = {
  label: string;
  icon?: React.ComponentProps<typeof MaterialDesignIcons>['name'];
  active: boolean;
  onPress: () => void;
};

export default function PrimaryRoleButton({
  label,
  icon,
  active,
  onPress,
}: PrimaryRoleButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, active && styles.activeButton]}
      onPress={onPress}
    >
      {icon && (
        <MaterialDesignIcons
          name={icon}
          size={18}
          color={active ? '#7B3FF2' : '#64748B'}
          style={styles.icon}
        />
      )}
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
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  activeButton: {
    borderColor: '#7B3FF2',
    backgroundColor: '#F3EEFF',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  activeText: {
    color: '#7B3FF2',
  },
});
