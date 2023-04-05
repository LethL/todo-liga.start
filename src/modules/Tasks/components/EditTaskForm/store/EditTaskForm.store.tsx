import { action, computed, makeObservable, observable } from 'mobx';
import React from 'react';
import { EditTaskEntity, TaskEntity } from 'domains/Task.entity';

type PrivateFields = '_loading';

class EditTaskFormProto {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _loading: observable,

      loading: computed,

      handleEditTask: action,
    });
  }

  _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  handleEditTask = async (data?: EditTaskEntity) => {
    this._loading = true;
    console.log(data);
    setTimeout(() => {
      this._loading = false;
    }, 300);
  };

  task = (data?: TaskEntity) => {
    console.log(data);
  };
}

export const EditTaskFormStore = new EditTaskFormProto();
