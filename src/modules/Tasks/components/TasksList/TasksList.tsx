import React from 'react';
import { observer } from 'mobx-react-lite';
import { Task } from '../Task';
import TaskStore from 'modules/Tasks/store/Tasks.store';
import { Loader } from 'components/Loader';

function TasksListProto() {
  const { tasks, handleTaskComplete, handleTaskImportance, handleTaskDelete, loading } = TaskStore;

  return (
    <div className="tasks-wrapper d-flex align-items-center justify-content-center">
      <ul className="list-group todo-list mb-3">
        <Loader isLoading={loading}>
          {tasks?.length ? (
            tasks.map((task) => (
              <li key={task.id} className="list-group-item">
                <Task
                  key={task.id}
                  task={task}
                  handleTaskComplete={handleTaskComplete}
                  handleTaskImportance={handleTaskImportance}
                  handleTaskDelete={handleTaskDelete}
                />
              </li>
            ))
          ) : (
            <h2>Tasks not found!</h2>
          )}
        </Loader>
      </ul>
    </div>
  );
}

export const TasksList = observer(TasksListProto);
