import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { PALETTE, RADII, SHADOWS, SPACING } from '../../constants/theme';

export interface PrimaryCardProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  activeOpacity?: number;
}

export default function PrimaryCard({
  children,
  style,
  onPress,
  activeOpacity = 0.85,
}: PrimaryCardProps) {
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={activeOpacity}
        style={[styles.card, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: SPACING.cardPadding,
    ...SHADOWS.softCard,
  },
});
