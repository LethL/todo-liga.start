import { EditTaskEntity } from 'domains/Task.entity';

export const DEFAULT_VALUES: EditTaskEntity = {
  taskName: '',
  taskDescription: '',
  taskIsImportant: false,
  taskIsDone: false,
};
