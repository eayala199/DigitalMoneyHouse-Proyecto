"use client"
import React, { useState, useEffect } from "react";
import Menu from '@/app/components/menu/menu';
import Card1Card from '@/app/components/card/Card1Card';
import Card1List from '@/app/components/card/Card1List';
import ClipLoader from "react-spinners/ClipLoader"; 

const page = () => {
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
      <h1 className="block text-2xl font-bold mb-4 sm:hidden">Tarjetas</h1>
        <Card1Card/>
        <Card1List/>
      </main>
    </div>
  );
}

export default page