import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Briefcase, User } from 'lucide-react-native';
import PrimaryText from '../text/PrimaryText';
import { PALETTE, RADII, SHADOWS } from '../../constants/theme';

type PrimaryRoleButtonProps = {
  label: string;
  icon?: 'account' | 'user' | 'briefcase' | 'business' | string;
  active: boolean;
  onPress: () => void;
};

export default function PrimaryRoleButton({
  label,
  icon,
  active,
  onPress,
}: PrimaryRoleButtonProps) {
  const iconColor = active ? PALETTE.primary : PALETTE.onSurfaceVariant;

  const renderIcon = () => {
    if (!icon) return null;
    if (icon === 'briefcase' || icon === 'business') {
      return <Briefcase size={18} color={iconColor} strokeWidth={2} />;
    }
    return <User size={18} color={iconColor} strokeWidth={2} />;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        active && styles.activeButton,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {icon ? <View style={styles.icon}>{renderIcon()}</View> : null}
      <PrimaryText
        text={label}
        customStyle={[styles.text, active && styles.activeText]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 52,
    flexDirection: 'row',
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    borderRadius: RADII.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.softCard,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  icon: {
    marginRight: 8,
  },
  activeButton: {
    borderColor: PALETTE.primary,
    backgroundColor: PALETTE.illusCoralBg,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: PALETTE.onSurfaceVariant,
  },
  activeText: {
    color: PALETTE.onSurface,
  },
});
