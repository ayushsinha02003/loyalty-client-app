import React from 'react';
import PrimaryInputField, { PrimaryInputFieldProps } from './PrimaryInputField';

export type PrimaryFormInputProps = PrimaryInputFieldProps;

export default function PrimaryFormInput(props: PrimaryFormInputProps) {
  return <PrimaryInputField {...props} />;
}
