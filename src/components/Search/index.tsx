import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';
import searchSvg from '../../assets/img/search.svg';
import removeSvg from '../../assets/img/remove.svg';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const updateSearchValue = React.useCallback(
    (value: string) => {
      dispatch(setSearchValue(value));
    },
    [dispatch],
  );

  const debouncedUpdateSearchValue = React.useMemo(
    () => debounce(updateSearchValue, 250),
    [updateSearchValue],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    debouncedUpdateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon_search} src={searchSvg} alt="Search icon" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        type="text"
        className={styles.input}
        placeholder="Пошук піци ..."
      />
      {value && (
        <img
          onClick={onClickClear}
          className={styles.icon_remove}
          src={removeSvg}
          alt="Search icon"
        />
      )}
    </div>
  );
};

export default Search;
