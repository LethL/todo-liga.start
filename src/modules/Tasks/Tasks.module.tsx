import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { TasksStats, TasksList, SearchForm } from './components';
import { TaskStore } from './store/Tasks.store';

function TasksProto() {
  useEffect(() => {
    TaskStore.loadTasks();
  }, []);

  return (
    <>
      <SearchForm />
      <TasksStats />
      <TasksList />
    </>
  );
}

export const Tasks = observer(TasksProto);
