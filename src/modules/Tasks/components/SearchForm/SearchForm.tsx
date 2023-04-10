import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { StatusFilter } from '../StatusFilter';
import { DEFAULT_VALUES } from './SearchForm.utils';
import { SearchFormWrapper } from './SearchForm.styles';
import { SearchInput } from 'components/index';
import { FiltersType } from 'domains/index';
import { TaskStore } from 'modules/Tasks/store/Tasks.store';

function SearchFormProto() {
  const { loading, loadTasks } = TaskStore;
  const { control, setValue, reset, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  const onSearchInputChange = (value: string) => {
    setValue('searchValue', value);
  };

  const onFilterChange = (type: FiltersType) => {
    setValue('filterType', type);
  };

  const onResetInput = (): void => {
    reset();
  };

  const onSubmit = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    handleSubmit(async (data) => {
      await loadTasks(data);
    })();
  };

  return (
    <SearchFormWrapper component={'form'}>
      <Controller
        control={control}
        name="searchValue"
        render={({ field }) => (
          <SearchInput disabled={loading} value={field.value} onChange={onSearchInputChange} onReset={onResetInput} />
        )}></Controller>
      <Controller
        control={control}
        name="filterType"
        render={({ field }) => (
          <StatusFilter disabled={loading} tasksType={field.value} onChange={onFilterChange} />
        )}></Controller>
      <Button type="submit" variant="contained" onClick={onSubmit} disabled={loading}>
        Find
      </Button>
    </SearchFormWrapper>
  );
}

export const SearchForm = observer(SearchFormProto);
