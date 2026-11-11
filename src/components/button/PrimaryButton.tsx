import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { PALETTE, RADII, SHADOWS } from '../../constants/theme';

export interface PrimaryButtonProps extends TouchableOpacityProps {
  title?: string;
  label?: string;
  children?: React.ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  textStyle?: StyleProp<TextStyle>;
}

export default function PrimaryButton({
  title,
  label,
  children,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
  activeOpacity = 0.85,
  ...restProps
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;
  const buttonText = title || label;

  const getVariantButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      case 'primary':
      default:
        return styles.primaryButton;
    }
  };

  const getVariantTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButtonText;
      case 'outline':
        return styles.outlineButtonText;
      case 'primary':
      default:
        return styles.primaryButtonText;
    }
  };

  return (
    <TouchableOpacity
      {...restProps}
      disabled={isDisabled}
      activeOpacity={activeOpacity}
      style={[
        styles.baseButton,
        getVariantButtonStyle(),
        isDisabled && styles.buttonDisabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? PALETTE.onPrimary : PALETTE.primary}
          size="small"
        />
      ) : children ? (
        children
      ) : (
        <Text style={[getVariantTextStyle(), textStyle]}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    height: 54,
    borderRadius: RADII.full,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  primaryButton: {
    backgroundColor: PALETTE.primary,
    ...SHADOWS.btn,
  },
  secondaryButton: {
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    ...SHADOWS.softCard,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: PALETTE.primary,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: PALETTE.onPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: PALETTE.onSurface,
    fontSize: 16,
    fontWeight: '700',
  },
  outlineButtonText: {
    color: PALETTE.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});
