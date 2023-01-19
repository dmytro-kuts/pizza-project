import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://63c4ef9df3a73b34784a9eda.mockapi.io/react-pizza')
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Помилка при отриманні данних');
      });
      window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Усі піци</h2>
      <div className="content__items">
        {isloading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
    </>
  );
};

export default Home;
