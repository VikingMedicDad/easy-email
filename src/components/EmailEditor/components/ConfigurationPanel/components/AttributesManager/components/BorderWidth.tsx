import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { TextField } from '@/components/core/Form';

export function BorderWidth() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <TextField
        label='Border width'
        quickchange
        name={`${focusIdx}.attributes.border-width`}
        inline
      />
    );
  }, [focusIdx]);
}
