"use client"
import React, { useState, useEffect } from "react";
import Menu from '../../components/menu/menu'; 
import CardHome from '@/app/components/card/CardHome';
import HomeButton from '@/app/components/buttons/HomeButton';
import ActivityList from '@/app/components/activity/ActivityList';
import ClipLoader from "react-spinners/ClipLoader"; 

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"lime"} loading={loading} />
      </div>
    );
  }
  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen"> 
      <h1 className="block text-2xl font-bold mb-4 sm:hidden">Inicio</h1>
        <CardHome />
        <div className="w-full max-w-[350px] md:max-w-[511px] lg:max-w-[1006px] flex flex-col lg:flex-row lg:space-x-4 mt-4 space-y-4 lg:space-y-0">
          <HomeButton text="Cargar dinero" href="/transactions" />
          <HomeButton text="Pago de servicios" href="/services" />
        </div>
        <ActivityList/>
      </main>
    </div>
  );
};

export default HomePage;
