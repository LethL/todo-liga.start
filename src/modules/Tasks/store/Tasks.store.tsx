import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { TaskEntity, TaskSearchEntity, TasksStatsEntity } from 'domains/Task.entity';
import { TasksAgentRequest } from 'http/agent';
import { getInternalInfo, mapToExternalParams, mapToInternalTasks } from 'helpers/mappers';

type PrivateFields = '_loading' | '_tasks' | '_taskStats' | '_searchForm';

class TasksStoreProto {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _tasks: observable,
      _loading: observable,
      _taskStats: observable,
      _searchForm: observable,

      tasks: computed,
      loading: computed,

      updateTask: action,
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

  private _taskStats: TasksStatsEntity | null = {
    total: 0,
    important: 0,
    done: 0,
  };

  get taskStats(): TasksStatsEntity | null {
    return this._taskStats;
  }

  private _searchForm?: TaskSearchEntity = {
    searchValue: '',
    filterType: 'All',
  };

  loadTasks = async (data?: TaskSearchEntity) => {
    const externalSearchParams = mapToExternalParams(data);
    const res = await TasksAgentRequest.getAllTasksRequest(externalSearchParams);
    runInAction(() => {
      this._tasks = mapToInternalTasks(res);
      this._taskStats = getInternalInfo(res);
    });
    return {
      tasks: mapToInternalTasks(res),
      tasksStats: getInternalInfo(res),
    };
  };

  updateTask = async (data?: TaskSearchEntity) => {
    runInAction(() => {
      this._loading = true;
    });
    try {
      if (data) this._searchForm = data;
      const { tasks, tasksStats } = await this.loadTasks(this._searchForm);
      this._tasks = tasks;
      this._taskStats = tasksStats;
    } catch {
      this._tasks = null;
      this._taskStats = null;
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  };

  handleTaskComplete = async (id: TaskEntity['id'], status: boolean) => {
    runInAction(() => {
      this._loading = true;
    });
    try {
      await TasksAgentRequest.updateTaskRequest(id, {
        isCompleted: !status,
        isImportant: status ? undefined : false,
      });
      const { tasks, tasksStats } = await this.loadTasks(this._searchForm);
      runInAction(() => {
        this._tasks = tasks;
        this._taskStats = tasksStats;
      });
    } catch {
      this._tasks = null;
      this._taskStats = null;
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  };

  handleTaskImportance = async (id: TaskEntity['id'], status: boolean) => {
    runInAction(() => {
      this._loading = true;
    });
    try {
      await TasksAgentRequest.updateTaskRequest(id, {
        isImportant: !status,
        isCompleted: status ? undefined : false,
      });
      const { tasks, tasksStats } = await this.loadTasks(this._searchForm);
      runInAction(() => {
        this._tasks = tasks;
        this._taskStats = tasksStats;
      });
    } catch {
      this._tasks = null;
      this._taskStats = null;
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  };

  handleTaskDelete = async (id: TaskEntity['id']) => {
    runInAction(() => {
      this._loading = true;
    });
    try {
      await TasksAgentRequest.deleteTaskRequest(id);
      const { tasks, tasksStats } = await this.loadTasks(this._searchForm);
      runInAction(() => {
        this._tasks = tasks;
        this._taskStats = tasksStats;
      });
    } catch {
      this._tasks = null;
      this._taskStats = null;
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  };
}

export const TaskStore = new TasksStoreProto();
