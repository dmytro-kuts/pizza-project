import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './FullPizza.module.scss';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://63c4ef9df3a73b34784a9eda.mockapi.io/react-pizza/' + id,
        );
        setPizza(data);
      } catch (error) {
        alert('Помилка при отриманні піци!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Завантаження.....';
  }

  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={pizza.imageUrl} alt={pizza.title} />
      </div>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₴</h4>
    </div>
  );
};

export default FullPizza;
