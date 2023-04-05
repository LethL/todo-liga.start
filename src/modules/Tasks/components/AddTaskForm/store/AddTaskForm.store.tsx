import { action, computed, makeObservable, observable } from 'mobx';
import React from 'react';
import { AddTaskEntity } from 'domains/Task.entity';

type PrivateFields = '_loading';

class AddTaskFormProto {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _loading: observable,

      loading: computed,

      handleAddTask: action,
    });
  }

  _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  handleAddTask = async (data?: AddTaskEntity) => {
    this._loading = true;
    console.log(data);
    setTimeout(() => {
      this._loading = false;
    }, 300);
  };
}

export const AddTaskFormStore = new AddTaskFormProto();
