import { FILTER_TYPES } from 'constants/index';

export interface TaskEntity {
  name: string;
  id: string;
  info: string;
  isImportant: boolean;
  isDone: boolean;
}

export interface TasksStatsEntity {
  total: number;
  important: number;
  done: number;
}

export type FiltersType = typeof FILTER_TYPES[keyof typeof FILTER_TYPES];

export interface TaskSearchEntity {
  searchValue: string;
  filterType: FiltersType;
}

export interface AddTaskEntity {
  taskName: string;
  taskDescription: string;
  taskIsImportant: boolean;
}

export interface EditTaskEntity {
  taskName: string;
  taskDescription: string;
  taskIsImportant: boolean;
  taskIsDone: boolean;
}
