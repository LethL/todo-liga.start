import { AddTaskEntity } from 'domains/Task.entity';

export const DEFAULT_VALUES: AddTaskEntity = {
  taskName: '',
  taskDescription: '',
  taskIsImportant: false,
};
