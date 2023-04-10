import React, { MouseEvent } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { StatusFilterProps } from './StatusFilter.types';
import { FiltersType } from 'domains/index';
import { FILTER_TYPES } from 'constants/index';

export function StatusFilter({ onChange, tasksType }: StatusFilterProps) {
  const onFilterChange = (evt: MouseEvent<HTMLDivElement> & { target: HTMLButtonElement }) => {
    onChange(evt.target.textContent as FiltersType);
  };

  return (
    <ButtonGroup onClick={onFilterChange} style={{ maxWidth: '280px' }}>
      <Button type="button" variant={tasksType === FILTER_TYPES.ALL ? 'contained' : 'outlined'}>
        {FILTER_TYPES.ALL}
      </Button>
      <Button type="button" variant={tasksType === FILTER_TYPES.ACTIVE ? 'contained' : 'outlined'}>
        {FILTER_TYPES.ACTIVE}
      </Button>
      <Button type="button" variant={tasksType === FILTER_TYPES.DONE ? 'contained' : 'outlined'}>
        {FILTER_TYPES.DONE}
      </Button>
      <Button type="button" variant={tasksType === FILTER_TYPES.IMPORTANT ? 'contained' : 'outlined'}>
        {FILTER_TYPES.IMPORTANT}
      </Button>
    </ButtonGroup>
  );
}
