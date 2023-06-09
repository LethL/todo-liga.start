import { FILTER_TYPES } from 'constants/index';

export interface TaskEntity {
  name: string;
  id: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
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
  name: string;
  info: string;
  isImportant?: boolean;
}

export interface EditTaskEntity {
  name: string;
  info: string;
  isImportant?: boolean;
  isCompleted?: boolean;
}
