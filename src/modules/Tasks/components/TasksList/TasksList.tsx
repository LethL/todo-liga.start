import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Box, List, Typography, CircularProgress, Button } from '@mui/material';
import { Task } from '../Task';
import { TaskListItem } from './TasksList.styles';
import { TaskStore } from 'modules/Tasks/store/Tasks.store';
import { PATH_LIST } from 'constants/index';

function TasksListProto() {
  const { tasks, handleTaskComplete, handleTaskImportance, handleTaskDelete, loading } = TaskStore;

  return (
    <Box>
      {loading === true ? (
        <CircularProgress style={{ marginLeft: '50%' }} />
      ) : (
        <>
          <List>
            {tasks?.length ? (
              tasks.map((task) => (
                <TaskListItem key={task.id}>
                  <Task
                    key={task.id}
                    task={task}
                    handleTaskComplete={handleTaskComplete}
                    handleTaskImportance={handleTaskImportance}
                    handleTaskDelete={handleTaskDelete}
                  />
                </TaskListItem>
              ))
            ) : (
              <Typography variant="h4" align="center">
                Tasks not found!
              </Typography>
            )}
          </List>
          <Button component={Link} to={PATH_LIST.ADD} fullWidth variant="contained">
            <Typography color={'#fff'}>Add task</Typography>
          </Button>
        </>
      )}
    </Box>
  );
}

export const TasksList = observer(TasksListProto);
