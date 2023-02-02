import { ReactComponent as PlusSvg } from '../../assets/img/plus.svg';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem, CartItem } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';

const typeNames = ['тонка', 'традиційна'];

type PizzaBlockProps = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
};
const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cart.items.find((obj) => obj.id === id));

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              onClick={() => setActiveType(typeId)}
              className={activeType === typeId ? 'active' : ''}
              key={typeId}
            >
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? 'active' : ''}
              key={index}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">від {price} ₴</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <PlusSvg />
          <span>Додати</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
