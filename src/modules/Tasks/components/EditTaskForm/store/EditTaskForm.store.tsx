import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { EditTaskEntity, TaskEntity } from 'domains/Task.entity';
import { TasksAgentRequest } from 'http/agent';
import { getInternalTask } from 'helpers/mappers';

type PrivateFields = '_loading' | '_task';

class EditTaskFormProto {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _task: observable,
      _loading: observable,

      task: computed,
      loading: computed,

      getTask: action,
      handleEditTask: action,
    });
  }

  private _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  private _task: TaskEntity = {
    name: '',
    id: '',
    info: '',
    isImportant: false,
    isCompleted: false,
  };

  get task(): TaskEntity {
    return this._task;
  }

  getTask = async (id: TaskEntity['id']) => {
    const res = await TasksAgentRequest.getTaskRequest(id);
    runInAction(() => {
      this._task = getInternalTask(res);
    });
    return {
      task: getInternalTask(res),
    };
  };

  handleEditTask = async (id: TaskEntity['id'], updateData?: EditTaskEntity) => {
    runInAction(() => {
      this._loading = true;
    });
    try {
      await TasksAgentRequest.updateTaskRequest(id, updateData);
    } catch {
      if (!updateData) return null;
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  };
}

export const EditTaskFormStore = new EditTaskFormProto();
