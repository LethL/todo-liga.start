import { Box, styled } from '@mui/material';

export const TasksStatsWrapper = styled(Box)({
  marginBottom: '0.5rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const TasksStatsBage = styled(Box)({
  backgroundColor: '#0dcaf0',
  display: 'inline-block',
  padding: '0.35em 0.65em',
  fontSize: '.75em',
  fontWeight: '700',
  lineHeight: '1',
  color: '#fff',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'baseline',
  borderRadius: '0.25rem',
});
