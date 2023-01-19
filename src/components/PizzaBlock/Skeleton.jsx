import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="133" cy="131" r="129" />
    <rect x="1" y="276" rx="15" ry="15" width="280" height="32" />
    <rect x="2" y="321" rx="15" ry="15" width="280" height="88" />
    <rect x="5" y="427" rx="15" ry="15" width="95" height="30" />
    <rect x="149" y="420" rx="20" ry="20" width="127" height="45" />
  </ContentLoader>
);

export default Skeleton;
