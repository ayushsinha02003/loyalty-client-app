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
          placeholderTextColor="#94A3B8"
          secureTextEntry={!visible}
        />

        {onToggle ? (
          <TouchableOpacity
            onPress={onToggle}
            disabled={!editable}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.toggle}>{visible ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

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
  field: {
    height: 54,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    paddingVertical: 0,
  },
  toggle: {
    color: '#7B3FF2',
    fontWeight: '600',
    fontSize: 14,
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
