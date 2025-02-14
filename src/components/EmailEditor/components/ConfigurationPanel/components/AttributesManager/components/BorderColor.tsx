import React, { useMemo } from 'react';
import { ColorPickerField } from '@/components/core/Form';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function BorderColor() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <ColorPickerField
        label='Border color'
        name={`${focusIdx}.attributes.border-color`}
        inline
      />
    );
  }, [focusIdx]);
}
