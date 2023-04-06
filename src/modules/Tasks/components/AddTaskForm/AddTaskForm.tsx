import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddTaskFormStore } from './store/AddTaskForm.store';
import { DEFAULT_VALUES } from './AddTaskForm.utils';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { PATH_LIST } from 'constants/paths';
import { Loader } from 'components/Loader';
import { AddTaskEntity } from 'domains/Task.entity';
import { validationSchema } from 'helpers/validationSchema';

function AddTaskFormProto() {
  const { handleAddTask, loading } = AddTaskFormStore;
  const navigate = useNavigate();
  const { control, setValue, reset, handleSubmit } = useForm<AddTaskEntity>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validationSchema),
  });

  const onChangeTaskName = (value: string) => {
    setValue('name', value);
  };

  const onChangeTaskDescr = (value: string) => {
    setValue('info', value);
  };

  const onTaskImportantCheck = (value: boolean) => {
    setValue('isImportant', value === false ? false : true);
  };

  const onSubmit = () => {
    handleSubmit(async (data: AddTaskEntity) => {
      handleAddTask(data);
      reset();
      return navigate('/');
    })();
  };

  return (
    <form className="tasks-wrapper d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
      <Loader isLoading={loading}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="Task name"
              placeholder="Clean room"
              inputType={'text'}
              onChange={onChangeTaskName}
              value={field.value}
              errorText={error?.message}
              className={`form-control ${error?.message ? 'is-invalid' : ''}`}
            />
          )}></Controller>
        <Controller
          control={control}
          name="info"
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="What to do description"
              placeholder="Clean my room"
              inputType={'text'}
              onChange={onChangeTaskDescr}
              value={field.value}
              errorText={error?.message}
              className={`form-control ${error?.message ? 'is-invalid' : ''}`}
            />
          )}></Controller>
        <Controller
          control={control}
          name="isImportant"
          render={({ field }) => (
            <Checkbox label="Important" checked={field.value} onChange={onTaskImportantCheck} />
          )}></Controller>
        <div className="search-form d-flex justify-content-between">
          <Link className="btn btn-primary d-block w-25" to={PATH_LIST.ROOT}>
            Go Back
          </Link>
          <button className="btn btn-primary d-block w-25" type="submit">
            Add Task
          </button>
        </div>
      </Loader>
    </form>
  );
}

export const AddTaskForm = observer(AddTaskFormProto);
