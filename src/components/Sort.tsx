import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort, Sort, SortPropertyEnum } from '../redux/slices/filterSlice';

import { ReactComponent as ArrowTopSvg } from '../assets/img/arrow-top.svg';

type SortListItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type SortPopupProps = {
  value: Sort;
};

export const list: SortListItem[] = [
  { name: 'популярності зменш.', sortProperty: SortPropertyEnum.RATING_DESK },
  { name: 'популярності збільш.', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'зменш. ціни', sortProperty: SortPropertyEnum.PRICE_DESK },
  { name: 'збільш. ціни', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавіту зменш.', sortProperty: SortPropertyEnum.TITLE_DESK },
  { name: 'алфавіту збільш.', sortProperty: SortPropertyEnum.TITLE_ASC },
];

const SortPopup: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: SortListItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handelClickOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        composedPath: Node[];
      };
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handelClickOutside);

    return () => document.body.removeEventListener('click', handelClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className={`sort__label ${open ? 'show' : ''}`}>
        <b>Сортування за:</b>
        <button onClick={() => setOpen(!open)}>
          <span>{value.name}</span>
          <ArrowTopSvg />
        </button>
      </div>
      <div className={`sort__popup ${open ? 'show' : ''}`}>
        <ul>
          {list.map((obj, i) => (
            <li
              onClick={() => onClickListItem(obj)}
              className={value.sortProperty === obj.sortProperty ? 'active' : ''}
              key={i}
            >
              {obj.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default SortPopup;
