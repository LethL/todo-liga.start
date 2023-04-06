import { useEffect } from 'react';
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
  const { handleEditTask, loading, task, getTask } = EditTaskFormStore;
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { control, setValue, handleSubmit, watch } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    getTask(`${taskId}`);
  }, []);

  useEffect(() => {
    setValue('name', task.name);
    setValue('info', task.info);
    setValue('isImportant', task.isImportant);
    setValue('isCompleted', task.isCompleted);
  }, [task.name, task.info, task.isImportant, task.isCompleted]);

  const onChangeTaskName = (value: string) => {
    setValue('name', value);
  };

  const onChangeTaskDescr = (value: string) => {
    setValue('info', value);
  };

  const onTaskImportantCheck = (value: boolean) => {
    setValue('isImportant', value === false ? false : true);
  };

  const onTaskCompletedCheck = (value: boolean) => {
    setValue('isCompleted', value === false ? false : true);
  };

  const onSubmit = async () => {
    handleSubmit(async (data: EditTaskEntity) => {
      await handleEditTask(`${taskId}`, data);
      return navigate('/');
    })();
  };

  return (
    <>
      <h1 className="text-primary text-center blue text-uppercase">TODO LIST | EDIT TASK {taskId}</h1>
      <form className="tasks-wrapper d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <Loader isLoading={loading}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Task name"
                placeholder={task.name}
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
                placeholder={task.info}
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
              <Checkbox
                label="Important"
                checked={field.value}
                onChange={onTaskImportantCheck}
                disabled={watch('isCompleted')}
              />
            )}></Controller>
          <Controller
            control={control}
            name="isCompleted"
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
