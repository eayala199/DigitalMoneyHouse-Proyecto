import React from 'react';
import Menu from '../../components/menu/menu'; 
import CardHome from '@/app/components/card/CardHome';
import HomeButton from '@/app/components/buttons/HomeButton';
import ActivityList from '@/app/components/activity/ActivityList';

const HomePage = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8"> 
        <CardHome />
        <div className="flex space-x-4 mt-4">
          <HomeButton text="Cargar dinero" />
          <HomeButton text="Pago de servicios" />
        </div>
        <ActivityList/>
      </main>
    </div>
  );
};

export default HomePage;
