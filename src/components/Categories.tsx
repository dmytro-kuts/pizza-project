import React from 'react';

type CategoriesProps = {
  catValue: number;
  onCangeCategory: (i: number) => void;
};
const categories = ['Всі', "М'ясні", 'Гриль', 'Гострі', 'Закриті', 'Вегетаріанська'];

const Categories: React.FC<CategoriesProps> = React.memo(({ catValue, onCangeCategory }) => {
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
});

export default Categories;
