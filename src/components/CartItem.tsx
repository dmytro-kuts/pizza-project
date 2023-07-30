import { ReactComponent as PlusSvg } from '../assets/img/plus.svg';

import React from 'react';
import { useDispatch } from 'react-redux';

import { addItem, CartItem, minusItem, removeItem } from '../redux/slices/cartSlice';

type CartItemProps = {
  id: string;
  title: string;
  type: string;
  price: number;
  size: number;
  imageUrl: string;
  count: number;
};

const CartItemBlock: React.FC<CartItemProps> = ({
  id,
  title,
  type,
  price,
  size,
  imageUrl,
  count,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      } as CartItem),
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm('Ви впевнені що хочете видалити товар?')) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type} {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          disabled={count === 1}
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <PlusSvg />
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <PlusSvg />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₴</b>
      </div>
      <div className="cart__item-remove">
        <div onClick={onClickRemove} className="button button--outline button--circle">
          <PlusSvg />
        </div>
      </div>
    </div>
  );
};

export default CartItemBlock;
