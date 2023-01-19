import React from 'react';

function Categories({ catValue, onCangeCategory }) {
  const categories = ['Всі', "М'ясні", 'Вегетаріанська', 'Гриль', 'Гострі', 'Закриті'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onCangeCategory(i)} className={catValue === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
