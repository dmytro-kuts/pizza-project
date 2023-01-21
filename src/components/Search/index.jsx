import React from 'react';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';
import searchSvg from '../../assets/img/search.svg';
import removeSvg from '../../assets/img/remove.svg';

const Search = () => {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 250),
    [],
  );
  
  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
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
