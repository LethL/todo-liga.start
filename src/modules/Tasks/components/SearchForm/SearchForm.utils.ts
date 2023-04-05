import { FILTER_TYPES } from 'constants/statusFilterTypes';
import { TaskSearchEntity } from 'domains/Task.entity';

export const DEFAULT_VALUES: TaskSearchEntity = {
  searchValue: '',
  filterType: FILTER_TYPES.ALL,
};
