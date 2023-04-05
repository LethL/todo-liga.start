import React from 'react';
import { Link } from 'react-router-dom';
import { TaskProps } from './Task.types';
import './Task.css';
import { EDIT, ROOT } from 'constants/index';

export function Task({ task, handleTaskComplete, handleTaskImportance, handleTaskDelete }: TaskProps) {
  const { name, info, isImportant, isDone, id } = task;

  const onTaskComplete = () => handleTaskComplete(id, isDone);

  const onTaskImportance = () => handleTaskImportance(id, isImportant);

  const onTaskDelete = () => handleTaskDelete(id);

  return (
    <div>
      <div className="task mb-2">
        <p
          className={`task__label ${isDone ? 'text-decoration-line-through text-secondary' : ''} ${
            isImportant ? 'text-success fw-bold' : ''
          }`}>
          {name}
        </p>

        <div className="task__btns">
          <button
            type="button"
            className={`task__btn btn ${
              isImportant ? 'btn-success' : 'btn-outline-success'
            } btn-sm float-right btn-important`}
            disabled={isDone}
            onClick={onTaskImportance}>
            <i className="fa fa-exclamation" />
          </button>

          <button
            type="button"
            className={`task__btn btn ${isDone ? 'btn-danger' : 'btn-outline-danger'} btn-sm float-right`}
            onClick={onTaskComplete}>
            <i className="fa fa-check" />
          </button>

          <button
            type="button"
            className="task__btn btn btn-outline-danger btn-sm float-right btn-delete"
            onClick={onTaskDelete}>
            <i className="fa fa-trash-o" />
          </button>

          <Link className="task__btn btn btn-outline-secondary btn-sm float-right" to={`${ROOT}${EDIT}/${id}`}>
            <i className="fa fa-pencil" />
          </Link>
        </div>
      </div>
      <p
        className={`${isDone ? 'text-decoration-line-through text-secondary' : ''} ${
          isImportant ? 'text-success fw-bold' : ''
        }`}>
        {info}
      </p>
    </div>
  );
}
