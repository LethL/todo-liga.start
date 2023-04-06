import { TaskSearchEntity, TaskEntity, TasksStatsEntity } from 'domains/index';
import { GetAllTasksRequest, GetAllTasksResponse, GetTaskResponse } from 'http/model';
import { FILTER_TYPES } from 'constants/statusFilterTypes';

export const mapToExternalParams = (params?: TaskSearchEntity): GetAllTasksRequest | undefined => {
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
        isCompleted: task.isCompleted || false,
      });
    }
  });

  return tasksArray;
};

export const getInternalInfo = (tasks: GetAllTasksResponse): TasksStatsEntity => {
  const total = tasks.length;
  const anotherStats = tasks.reduce(
    (acc, task) => {
      return {
        important: task.isImportant ? acc.important + 1 : acc.important,
        done: task.isCompleted ? acc.done + 1 : acc.done,
      };
    },
    {
      important: 0,
      done: 0,
    }
  );

  return {
    total,
    ...anotherStats,
  };
};

export const getInternalTask = (task: GetTaskResponse): TaskEntity => {
  const mappedTask: TaskEntity = {
    name: task.name || 'Undefined',
    id: String(task.id),
    info: task.info || 'Undefined',
    isImportant: task.isImportant || false,
    isCompleted: task.isCompleted || false,
  };

  return mappedTask;
};
