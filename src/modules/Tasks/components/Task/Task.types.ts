import { TaskEntity } from 'domains/index';

export type TaskProps = {
  task: TaskEntity;
  handleTaskComplete: (id: string, status: boolean) => void;
  handleTaskImportance: (id: string, status: boolean) => void;
  handleTaskDelete: (id: string) => void;
};
