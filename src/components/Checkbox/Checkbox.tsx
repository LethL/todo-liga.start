import React, { ChangeEventHandler } from 'react';
import { FormLabel, Box } from '@mui/material';
import { CheckboxProps } from './Checkbox.types';
import { CheckboxElement } from './Checkbox.styles';

export function Checkbox({ label, checked, onChange, disabled }: CheckboxProps) {
  const onCheckboxChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.checked);
  return (
    <Box display={'flex'} alignItems={'center'} mb={'0.5em'}>
      <CheckboxElement
        className="form-check-input"
        value=""
        id={label}
        disabled={disabled}
        checked={checked}
        onChange={onCheckboxChange}
      />
      <FormLabel>{label}</FormLabel>
    </Box>
  );
}
