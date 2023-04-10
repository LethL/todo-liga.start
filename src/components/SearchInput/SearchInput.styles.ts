import { Box, Button, Input, styled } from '@mui/material';

export const SearchPanel = styled(Box)({
  position: 'relative',
});

export const SearchInputElement = styled(Input)({
  width: 'auto',
  flexGrow: '1',
  display: 'block',
  padding: '.375rem .75rem',
  border: '1px solid #ced4da',
  borderRadius: '0.25rem',
});

export const SearchBtn = styled(Button)({
  position: 'absolute',
  top: '6px',
  right: '10px',
  border: 'none',
  backgroundColor: 'inherit',
});
