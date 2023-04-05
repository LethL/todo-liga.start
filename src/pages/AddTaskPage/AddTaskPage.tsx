import React from 'react';
import { PageContainer } from 'components/index';
import { AddTaskForm } from 'modules/Tasks/components/AddTaskForm';

export function AddTaskPage() {
  return (
    <PageContainer>
      <h1 className="text-primary text-center blue text-uppercase">TODO LIST | ADD TASK</h1>
      <AddTaskForm />
    </PageContainer>
  );
}
