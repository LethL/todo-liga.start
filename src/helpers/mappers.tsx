import { TaskSearchEntity, TaskEntity } from 'domains/index';
import { GetAllTasksQuery, GetAllTasksResponse } from 'http/model';
import { FILTER_TYPES } from 'constants/statusFilterTypes';

export const mapToExternalParams = (params?: TaskSearchEntity): GetAllTasksQuery | undefined => {
  if (!params) return undefined;

  const { searchValue, filterType } = params;
  let isCompleted = undefined;

  if (filterType === FILTER_TYPES.DONE) isCompleted = true;
  else if (filterType === FILTER_TYPES.ACTIVE) isCompleted = false;

  return {
    name_like: searchValue ?? undefined,
    isImportant: filterType === FILTER_TYPES.IMPORTANT ? true : undefined,
    isCompleted,
  };
};

export const mapToInternalTasks = (tasks: GetAllTasksResponse): TaskEntity[] => {
  const tasksArray: TaskEntity[] = [];

  tasks.forEach((task) => {
    if (task) {
      tasksArray.push({
        name: task.name || 'Undefined',
        id: String(task.id),
        info: task.info || 'Undefined',
        isImportant: task.isImportant || false,
        isDone: task.isCompleted || false,
      });
    }
  });

  return tasksArray;
};
