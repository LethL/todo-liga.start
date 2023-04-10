import { Box, Button, Typography, styled } from '@mui/material';

export const TaskBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '7px',
});

export const TaskTextDone = styled(Typography)({
  textDecoration: 'line-through',
});

export const TaskTextImportant = styled(Typography)({
  color: 'green',
  fontWeight: '700',
});

export const TaskBtnsBox = styled(TaskBox)({
  display: 'flex',
  justifyContent: 'space-between',
  minWidth: '140px',
});

export const TaskBtn = styled(Button)({
  display: 'flex',
  minWidth: 'auto',
  width: '30px',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.2rem',
  cursor: 'pointer',
  transition: 'all .2s linear',
  '&:hover': {
    opacity: '1',
    color: '#fff',
  },
});

export const TaskImportantBtn = styled(TaskBtn)({
  color: '#198754',
  border: '1px solid #198754',
  '&:hover': {
    backgroundColor: '#198754',
  },
});

export const TaskIsImportantBtn = styled(TaskImportantBtn)({
  backgroundColor: '#198754',
  opacity: '1',
  color: '#fff',
  transition: 'opacity .2s linear',
  '&:hover': {
    opacity: '.65',
  },
});

export const TaskDeleteBtn = styled(TaskBtn)({
  color: '#dc3545',
  border: '1px solid #dc3545',
  '&:hover': {
    backgroundColor: '#dc3545',
  },
});

export const TaskIsDeleteBtn = styled(TaskDeleteBtn)({
  color: '#fff',
  border: '1px solid #dc3545',
  backgroundColor: '#dc3545',
  '&:hover': {
    opacity: '.65',
  },
});
