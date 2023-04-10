import React, { ChangeEventHandler } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { TextFieldProps } from './TextField.types';
import { TextFieldLabel } from './TextField.styles';

export function TextFieldElement({
  label,
  placeholder,
  inputType,
  value,
  onChange,
  errorText,
  className,
}: TextFieldProps) {
  const onInputChangeValue: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.value);
  return (
    <Box margin={'1em 0'}>
      <TextFieldLabel className="form-label">{label}</TextFieldLabel>
      <TextField
        type={inputType}
        className={`form-control ${className}`}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onInputChangeValue}
      />
      {errorText && (
        <Typography variant="caption" color={'red'} mt={'#dc3545'}>
          {errorText}
        </Typography>
      )}
    </Box>
  );
}
