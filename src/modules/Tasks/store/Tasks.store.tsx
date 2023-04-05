import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import React from 'react';
import { TaskEntity, TaskSearchEntity, TasksStatsEntity } from 'domains/Task.entity';
import { TasksMock } from '__mocks__/Tasks.mock';
import { TasksAgentRequest } from 'http/agent';
import { mapToExternalParams, mapToInternalTasks } from 'helpers/mappers';

type PrivateFields = '_loading' | '_tasks';

class TasksStoreProto {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _loading: observable,
      _taskStats: observable,

      tasks: computed,
      loading: computed,

      handleTaskComplete: action,
      handleTaskImportance: action,
      handleTaskDelete: action,
    });
  }

  private _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  private _tasks: TaskEntity[] | null = [];

  get tasks(): TaskEntity[] | null {
    return this._tasks;
  }

  _taskStats: TasksStatsEntity = {
    total: 8,
    important: 8,
    done: 8,
  };

  get taskStats(): TasksStatsEntity {
    return this._taskStats;
  }

  loadTasks = async (data?: TaskSearchEntity) => {
    // this._loading = true;
    // this._tasks = TasksMock;
    const externalSearchParams = mapToExternalParams(data);
    const res = await TasksAgentRequest.getAllTasksRequest(externalSearchParams);
    runInAction(() => {
      this._tasks = mapToInternalTasks(res);
    });
    // if (data) {
    //   console.log(data);
    // }
    // setTimeout(() => {
    //   this._loading = false;
    // }, 300);
  };

  handleTaskComplete = (id: TaskEntity['id'], status: boolean) => {
    this._loading = true;
    console.log(id, !status);
    // this.loadTasks();
  };

  handleTaskImportance = (id: TaskEntity['id'], status: boolean) => {
    this._loading = true;
    console.log(id, !status);
    // this.loadTasks();
  };

  handleTaskDelete = (id: TaskEntity['id']) => {
    this._loading = true;
    console.log('task', id, 'deleted');
    // this.loadTasks();
  };
}

const TaskStore = new TasksStoreProto();
export default TaskStore;
