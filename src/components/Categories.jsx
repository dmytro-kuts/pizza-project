import React, { useState } from 'react';

function Categories() {
  const categories = ['Всі', "М'ясні", 'Вегетаріанська', 'Гриль', 'Гострі', 'Закриті'];

  const [activeIndex, setActivIndex] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => setActivIndex(index)}
            className={activeIndex === index ? 'active' : ''}
            key={category}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
