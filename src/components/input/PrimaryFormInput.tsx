import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import PrimaryText from '../text/PrimaryText';

type PrimaryFormInputProps = {
  label: string;
} & React.ComponentProps<typeof TextInput>;

export default function PrimaryFormInput({
  label,
  ...inputProps
}: PrimaryFormInputProps) {
  return (
    <View style={styles.container}>
      <PrimaryText text={label} customStyle={styles.label} />
      <TextInput
        {...inputProps}
        style={styles.input}
        placeholderTextColor="#94A3B8"
      />
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
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
});
