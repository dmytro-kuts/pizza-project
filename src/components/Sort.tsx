import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort, Sort, SortPropertyEnum } from '../redux/slices/filterSlice';

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
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="rgb(176, 176, 176)"
            ></path>
          </svg>
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
