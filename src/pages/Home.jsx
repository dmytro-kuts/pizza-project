import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [pizzasItem, setPizzasItem] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярності',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

    fetch(
      `https://63c4ef9df3a73b34784a9eda.mockapi.io/react-pizza?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzasItem(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Помилка при отриманні данних');
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <>
      <div className="content__top">
        <Categories catValue={categoryId} onCangeCategory={(i) => setCategoryId(i)} />
        <Sort sortValue={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Усі піци</h2>
      <div className="content__items">
        {isloading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzasItem.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
    </>
  );
};

export default Home;
