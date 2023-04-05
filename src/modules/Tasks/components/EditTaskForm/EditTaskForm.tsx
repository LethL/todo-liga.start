import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditTaskFormStore } from './store/EditTaskForm.store';
import { DEFAULT_VALUES } from './EditTaskForm.utils';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { PATH_LIST } from 'constants/paths';
import { Loader } from 'components/Loader';
import { validationSchema } from 'helpers/validationSchema';
import { EditTaskEntity } from 'domains/Task.entity';

function EditTaskFormProto() {
  const { handleEditTask, loading, task } = EditTaskFormStore;
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { control, setValue, reset, handleSubmit, watch } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    task();
  }, []);

  const onChangeTaskName = (value: string) => {
    setValue('taskName', value);
  };

  const onChangeTaskDescr = (value: string) => {
    setValue('taskDescription', value);
  };

  const onTaskImportantCheck = (value: boolean) => {
    setValue('taskIsImportant', value === false ? false : true);
  };

  const onTaskCompletedCheck = (value: boolean) => {
    setValue('taskIsDone', value === false ? false : true);
  };

  const onSubmit = async () => {
    handleSubmit(async (data: EditTaskEntity) => {
      await handleEditTask(data);
      reset();
    })();

    setTimeout(() => {
      return navigate('/');
    }, 300);
  };

  return (
    <>
      <h1 className="text-primary text-center blue text-uppercase">TODO LIST | EDIT TASK {taskId}</h1>
      <form className="tasks-wrapper d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <Loader isLoading={loading}>
          <Controller
            control={control}
            name="taskName"
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
            name="taskDescription"
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
            name="taskIsImportant"
            render={({ field }) => (
              <Checkbox
                label="Important"
                checked={field.value}
                onChange={onTaskImportantCheck}
                disabled={watch('taskIsDone')}
              />
            )}></Controller>
          <Controller
            control={control}
            name="taskIsDone"
            render={({ field }) => (
              <Checkbox label="Completed" checked={field.value} onChange={onTaskCompletedCheck} />
            )}></Controller>
          <div className="search-form d-flex justify-content-between">
            <Link className="btn btn-primary d-block w-25" to={PATH_LIST.ROOT}>
              Go Back
            </Link>
            <button className="btn btn-primary d-block w-25" type="submit">
              Edit Task
            </button>
          </div>
        </Loader>
      </form>
    </>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
