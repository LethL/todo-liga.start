import React from 'react';
import { EditTaskForm } from 'modules/Tasks/components/EditTaskForm';
import { PageContainer } from 'components/index';

export function EditTaskPage() {
  // const { tasks, handleTaskComplete, handleTaskImportance, handleTaskDelete, loading } = TaskStore;

  return (
    <PageContainer>
      <EditTaskForm />
    </PageContainer>
  );
}
