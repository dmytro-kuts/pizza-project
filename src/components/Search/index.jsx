import React from 'react';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';
import searchSvg from '../../assets/img/search.svg';
import removeSvg from '../../assets/img/remove.svg';

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  const onClickClear = () => {
    
  }

  return (
    <div className={styles.root}>
      <img className={styles.icon_search} src={searchSvg} alt="Search icon" />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        type="text"
        className={styles.input}
        placeholder="Пошук піци ..."
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue('')}
          className={styles.icon_remove}
          src={removeSvg}
          alt="Search icon"
        />
      )}
    </div>
  );
};

export default Search;
