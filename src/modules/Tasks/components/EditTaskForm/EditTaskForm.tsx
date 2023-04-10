import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, CircularProgress, Typography } from '@mui/material';
import { EditTaskFormStore } from './store/EditTaskForm.store';
import { DEFAULT_VALUES } from './EditTaskForm.utils';
import { TextFieldElement } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { validationSchema } from 'helpers/validationSchema';
import { EditTaskEntity } from 'domains/Task.entity';
import { FormBtns } from 'components/FormBtns/FormBtns';

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
      navigate('/');
    })();
  };

  return (
    <>
      <Typography variant="h1">TODO LIST | EDIT TASK {taskId}</Typography>
      {loading === true ? (
        <CircularProgress style={{ marginLeft: '50%' }} />
      ) : (
        <Box component={'form'} display={'flex'} flexDirection={'column'} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <TextFieldElement
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
              <TextFieldElement
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
          <FormBtns />
        </Box>
      )}
    </>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
