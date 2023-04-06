import { EditTaskEntity } from 'domains/Task.entity';

export const DEFAULT_VALUES: EditTaskEntity = {
  name: '',
  info: '',
  isImportant: false,
  isCompleted: false,
};
