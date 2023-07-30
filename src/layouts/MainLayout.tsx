import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <div className="content__container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
