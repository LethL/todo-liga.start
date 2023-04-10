import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DoneIcon from '@mui/icons-material/Done';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { TaskProps } from './Task.types';
import {
  TaskBox,
  TaskBtnsBox,
  TaskDeleteBtn,
  TaskImportantBtn,
  TaskIsDeleteBtn,
  TaskIsImportantBtn,
  TaskTextDone,
  TaskTextImportant,
} from './Task.styles';
import { EDIT, ROOT } from 'constants/index';

export function Task({ task, handleTaskComplete, handleTaskImportance, handleTaskDelete }: TaskProps) {
  const { name, info, isImportant, isCompleted, id } = task;

  const onTaskComplete = () => handleTaskComplete(id, isCompleted);

  const onTaskImportance = () => handleTaskImportance(id, isImportant);

  const onTaskDelete = () => handleTaskDelete(id);

  return (
    <Box>
      <TaskBox>
        {isCompleted === true ? (
          <TaskTextDone variant="h6">{name}</TaskTextDone>
        ) : isImportant === true ? (
          <TaskTextImportant variant="h6">{name}</TaskTextImportant>
        ) : (
          <Typography variant="h6">{name}</Typography>
        )}

        <TaskBtnsBox>
          {isImportant === true ? (
            <TaskIsImportantBtn type="button" disabled={isCompleted} onClick={onTaskImportance}>
              <PriorityHighIcon />
            </TaskIsImportantBtn>
          ) : (
            <TaskImportantBtn type="button" disabled={isCompleted} onClick={onTaskImportance}>
              <PriorityHighIcon />
            </TaskImportantBtn>
          )}

          {isCompleted === true ? (
            <TaskIsDeleteBtn type="button" onClick={onTaskComplete}>
              <DoneIcon />
            </TaskIsDeleteBtn>
          ) : (
            <TaskDeleteBtn type="button" onClick={onTaskComplete}>
              <DoneIcon />
            </TaskDeleteBtn>
          )}

          <TaskDeleteBtn type="button" onClick={onTaskDelete}>
            <DeleteForeverIcon />
          </TaskDeleteBtn>

          <Button
            sx={{
              maxWidth: 30,
              display: 'flex',
              minWidth: 'auto',
              padding: '0.25rem 0.5rem',
              border: '1px solid #0d6efd',
            }}
            component={Link}
            to={`${ROOT}${EDIT}/${id}`}>
            <EditIcon />
          </Button>
        </TaskBtnsBox>
      </TaskBox>

      {isCompleted === true ? (
        <TaskTextDone variant="body2">{info}</TaskTextDone>
      ) : isImportant === true ? (
        <TaskTextImportant variant="body2">{info}</TaskTextImportant>
      ) : (
        <Typography variant="body2">{info}</Typography>
      )}
    </Box>
  );
}
