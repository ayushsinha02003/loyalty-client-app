import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import PrimaryText from '../text/PrimaryText';

type PrimaryPasswordFieldProps = {
  label: string;
  visible: boolean;
  onToggle: () => void;
} & React.ComponentProps<typeof TextInput>;

export default function PrimaryPasswordField({
  label,
  visible,
  onToggle,
  ...inputProps
}: PrimaryPasswordFieldProps) {
  return (
    <View style={styles.container}>
      <PrimaryText text={label} customStyle={styles.label} />
      <View style={styles.field}>
        <TextInput
          {...inputProps}
          style={styles.input}
          placeholderTextColor="#94A3B8"
          secureTextEntry={!visible}
        />
        <TouchableOpacity onPress={onToggle}>
          <PrimaryText
            text={visible ? 'Hide' : 'Show'}
            customStyle={styles.toggle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  field: {
    height: 55,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  toggle: {
    color: '#7B3FF2',
    fontWeight: '600',
  },
});
