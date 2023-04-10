import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, CircularProgress } from '@mui/material';
import { AddTaskFormStore } from './store/AddTaskForm.store';
import { DEFAULT_VALUES } from './AddTaskForm.utils';
import { TextFieldElement } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { AddTaskEntity } from 'domains/Task.entity';
import { validationSchema } from 'helpers/validationSchema';
import { FormBtns } from 'components/FormBtns/FormBtns';

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
      setTimeout(() => {
        navigate('/');
      }, 1);
    })();
  };

  return (
    <Box component={'form'} display={'flex'} flexDirection={'column'} onSubmit={handleSubmit(onSubmit)}>
      {loading === true ? (
        <CircularProgress style={{ marginLeft: '50%' }} />
      ) : (
        <>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <TextFieldElement
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
              <TextFieldElement
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
          <FormBtns />
        </>
      )}
    </Box>
  );
}

export const AddTaskForm = observer(AddTaskFormProto);
