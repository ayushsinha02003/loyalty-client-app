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
          color={variant === 'primary' ? '#FFFFFF' : '#7B3FF2'}
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
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#7B3FF2',
    shadowColor: '#7B3FF2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#7B3FF2',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '700',
  },
  outlineButtonText: {
    color: '#7B3FF2',
    fontSize: 16,
    fontWeight: '700',
  },
});
