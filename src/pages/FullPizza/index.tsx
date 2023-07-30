import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import styles from './FullPizza.module.scss';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/pizzas/` + id,
        );
        setPizza(data);
      } catch (error) {
        alert('Помилка при отриманні піци!');
        navigate('/');
      }
    }
    fetchPizza();
  }, [navigate, id]);

  if (!pizza) {
    return <>Завантаження.....</>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={pizza.imageUrl} alt={pizza.title} />
      </div>
      <h2>{pizza.title}</h2>
      <h4>від {pizza.price} ₴</h4>
      <Link to={'/'} className="button button--outline button--add" >
        <span>На головну</span>
      </Link>
    </div>
  );
};

export default FullPizza;
