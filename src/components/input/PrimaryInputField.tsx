import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { PALETTE, RADII, SHADOWS } from '../../constants/theme';

export interface PrimaryInputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  hasError?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export default function PrimaryInputField({
  label,
  error,
  hasError,
  containerStyle,
  labelStyle,
  inputStyle,
  style,
  editable = true,
  ...inputProps
}: PrimaryInputFieldProps) {
  const isError = Boolean(error) || Boolean(hasError);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}

      <TextInput
        {...inputProps}
        editable={editable}
        placeholderTextColor={PALETTE.onSurfaceMuted}
        style={[
          styles.input,
          isError && styles.inputErrorBorder,
          !editable && styles.inputDisabled,
          inputStyle,
          style,
        ]}
      />

      {error ? <Text style={styles.fieldError}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: PALETTE.onSurfaceVariant,
    marginBottom: 8,
    marginLeft: 6,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: PALETTE.border,
    borderRadius: RADII.full,
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: '500',
    color: PALETTE.onSurface,
    backgroundColor: PALETTE.surface,
    ...SHADOWS.softCard,
  },
  inputErrorBorder: {
    borderColor: PALETTE.primary,
    borderWidth: 1.5,
  },
  inputDisabled: {
    backgroundColor: PALETTE.surfaceAlt,
    opacity: 0.75,
  },
  fieldError: {
    color: PALETTE.primary,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 8,
    fontWeight: '600',
  },
});
