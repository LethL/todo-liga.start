import React from 'react';
import { observer } from 'mobx-react-lite';
import { CircularProgress, Box } from '@mui/material';
import { TasksStatsBage, TasksStatsWrapper } from './TasksStats.styles';
import { TaskStore } from 'modules/Tasks/store/Tasks.store';

function TasksStatsProto() {
  const { loading, taskStats } = TaskStore;

  return (
    <TasksStatsWrapper>
      <Box>
        Total:
        <TasksStatsBage component="span">
          {loading === true ? <CircularProgress size={15} color="inherit" /> : taskStats ? taskStats.total : 0}
        </TasksStatsBage>
      </Box>
      <Box>
        Important:
        <TasksStatsBage component="span">
          {loading === true ? <CircularProgress size={15} color="inherit" /> : taskStats ? taskStats.important : 0}
        </TasksStatsBage>
      </Box>
      <Box>
        Done:
        <TasksStatsBage component="span">
          {loading === true ? <CircularProgress size={15} color="inherit" /> : taskStats ? taskStats.done : 0}
        </TasksStatsBage>
      </Box>
    </TasksStatsWrapper>
  );
}

export const TasksStats = observer(TasksStatsProto);
