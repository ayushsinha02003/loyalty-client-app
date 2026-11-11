import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { PALETTE, RADII, SHADOWS } from '../../constants/theme';

export interface PrimaryPasswordFieldProps extends TextInputProps {
  label?: string;
  visible?: boolean;
  onToggle?: () => void;
  error?: string;
  hasError?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export default function PrimaryPasswordField({
  label,
  visible = false,
  onToggle,
  error,
  hasError,
  containerStyle,
  labelStyle,
  inputStyle,
  style,
  editable = true,
  ...inputProps
}: PrimaryPasswordFieldProps) {
  const isError = Boolean(error) || Boolean(hasError);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}

      <View
        style={[
          styles.field,
          isError && styles.inputErrorBorder,
          !editable && styles.inputDisabled,
          style,
        ]}
      >
        <TextInput
          {...inputProps}
          editable={editable}
          style={[styles.input, inputStyle]}
          placeholderTextColor={PALETTE.onSurfaceMuted}
          secureTextEntry={!visible}
        />

        {onToggle ? (
          <TouchableOpacity
            onPress={onToggle}
            disabled={!editable}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.eyeButton}
          >
            {visible ? (
              <EyeOff size={18} color={PALETTE.onSurfaceVariant} strokeWidth={2} />
            ) : (
              <Eye size={18} color={PALETTE.onSurfaceVariant} strokeWidth={2} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>

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
  field: {
    height: 52,
    borderWidth: 1,
    borderColor: PALETTE.border,
    borderRadius: RADII.full,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: PALETTE.surface,
    ...SHADOWS.softCard,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: PALETTE.onSurface,
    paddingVertical: 0,
  },
  eyeButton: {
    paddingLeft: 8,
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
