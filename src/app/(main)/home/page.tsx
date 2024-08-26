import React from 'react';
import Menu from '../../components/menu/menu'; 

const HomePage = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4">
        <div>home</div>
      </main>
    </div>
  );
};

export default HomePage;
