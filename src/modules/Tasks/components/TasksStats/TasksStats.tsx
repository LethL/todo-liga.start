import React from 'react';
import { observer } from 'mobx-react-lite';
import TaskStore from 'modules/Tasks/store/Tasks.store';
import { Loader } from 'components/Loader';

function TasksStatsProto() {
  const { loading, taskStats } = TaskStore;

  return (
    <div className="d-flex w-100 justify-content-between mb-2">
      <div>
        Total:
        <Loader isLoading={loading} variant={'dot'}>
          <span className="badge bg-info">{taskStats.total}</span>
        </Loader>
      </div>
      <div>
        Important:
        <Loader isLoading={loading} variant={'dot'}>
          <span className="badge bg-info">{taskStats.important}</span>
        </Loader>
      </div>
      <div>
        Done:
        <Loader isLoading={loading} variant={'dot'}>
          <span className="badge bg-info">{taskStats.done}</span>
        </Loader>
      </div>
    </div>
  );
}

export const TasksStats = observer(TasksStatsProto);