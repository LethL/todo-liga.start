import React, { ChangeEventHandler, MouseEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { SearchInputProps } from './SearchInput.types';
import { SearchPanel, SearchBtn, SearchInputElement } from './SearchInput.styles';

export function SearchInput({ onChange, value, onReset }: SearchInputProps) {
  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.value);

  const onResetBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (onReset) onReset();
  };

  return (
    <SearchPanel>
      <SearchInputElement placeholder="search" onChange={onSearchInputChange} value={value} />
      <SearchBtn onClick={onResetBtnClick}>
        <CloseIcon />
      </SearchBtn>
    </SearchPanel>
  );
}
