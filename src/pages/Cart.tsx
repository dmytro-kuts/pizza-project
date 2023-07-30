import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../components/CartItem';
import CartEmpty from '../components/CartEmpty';
import { clearItem } from '../redux/slices/cartSlice';
import { RootState } from '../redux/store';

import { ReactComponent as CartSvg } from '../assets/img/cart.svg';
import { ReactComponent as TrashSvg } from '../assets/img/trash.svg';
import { ReactComponent as GreyArrowSvg } from '../assets/img/grey-arrow-left.svg';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state: RootState) => state.cart);

  const totalCount = items.reduce((sum: number, item) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm('Очистити корзину?')) {
      dispatch(clearItem());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div>
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <CartSvg />
            Кошик
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <TrashSvg />
            <span>Очистити корзину</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Усього піци: <b>{totalCount} шт.</b>
            </span>
            <span>
              Сума замовлення: <b>{totalPrice} ₴</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <GreyArrowSvg />
              <span>Повернутися назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатити зараз</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
