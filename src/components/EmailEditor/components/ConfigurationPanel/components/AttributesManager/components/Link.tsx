import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { LinkOutlined } from '@ant-design/icons';
import { SelectField, TextField } from '@/components/core/Form';
import { Stack } from '@/components/UI/Stack';

export function Link() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack vertical>
        <Stack.Item fill>
          <TextField
            prefix={<LinkOutlined />}
            label={<span>Href&nbsp;&nbsp;&nbsp;</span>}
            name={`${focusIdx}.attributes.href`}
            inline
          />
        </Stack.Item>

        <div style={{ minWidth: 150 }}>
          <SelectField
            label='Target'
            name={`${focusIdx}.attributes.target`}
            options={[
              {
                value: '',
                label: '_self',
              },
              {
                value: '_blank',
                label: '_blank',
              },
            ]}
            inline
          />
        </div>
      </Stack>
    );
  }, [focusIdx]);
}
