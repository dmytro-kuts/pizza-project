import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReactComponent as Cart } from '../assets/img/cart.svg';
import logoSvg from '../assets/img/pizza-logo.png';
import Search from './Search';
import { RootState } from '../redux/store';

function Header() {
  const { totalPrice, items } = useSelector((state: RootState) => state.cart);
  const location = useLocation();
  const isMounted = React.useRef(false);

  const totalCount = items.reduce((sum: number, item) => sum + item.count, 0);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>Найсмачніша піца у всесвіті</p>
            </div>
          </div>
        </Link>
        {location.pathname !== '/cart' && <Search />}
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} ₴</span>
            <div className="button__delimiter"></div>
            <Cart/>
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
