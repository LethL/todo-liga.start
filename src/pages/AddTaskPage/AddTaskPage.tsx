import React from 'react';
import { Typography } from '@mui/material';
import { PageContainer } from 'components/index';
import { AddTaskForm } from 'modules/Tasks/components/AddTaskForm';

export function AddTaskPage() {
  return (
    <PageContainer>
      <Typography variant="h1">TODO LIST | ADD TASK</Typography>
      <AddTaskForm />
    </PageContainer>
  );
}
