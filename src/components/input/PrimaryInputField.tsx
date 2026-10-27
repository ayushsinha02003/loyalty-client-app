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
        placeholderTextColor="#94A3B8"
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
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  inputErrorBorder: {
    borderColor: '#DC2626',
    borderWidth: 1.5,
  },
  inputDisabled: {
    backgroundColor: '#F8FAFC',
    opacity: 0.8,
  },
  fieldError: {
    color: '#DC2626',
    fontSize: 13,
    marginTop: 6,
    fontWeight: '500',
  },
});
