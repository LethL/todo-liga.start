import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import React from 'react';
import { AddTaskEntity } from 'domains/Task.entity';
import { TasksAgentRequest } from 'http/agent';

type PrivateFields = '_loading';

class AddTaskFormProto {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _loading: observable,

      loading: computed,

      handleAddTask: action,
    });
  }

  private _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  handleAddTask = async (taskData?: AddTaskEntity) => {
    runInAction(() => {
      this._loading = true;
    });
    try {
      await TasksAgentRequest.addTaskRequest(taskData);
    } catch {
      if (!taskData) return null;
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  };
}

export const AddTaskFormStore = new AddTaskFormProto();
