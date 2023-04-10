import React from 'react';
import { Typography } from '@mui/material';
import { PageContainer } from 'components/index';
import { Tasks } from 'modules/index';

export function TasksPage() {
  return (
    <PageContainer>
      <Typography variant="h1">TODO LIST</Typography>
      <Tasks />
    </PageContainer>
  );
}
