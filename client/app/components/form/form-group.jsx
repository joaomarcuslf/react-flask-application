import React from 'react';
import { FormLabel } from '../../theme';

export default function FormGroup({ label, name, error, children }) {
  return (
    <FormLabel for={name} error={error}>
      {label}:{children}
    </FormLabel>
  );
}
