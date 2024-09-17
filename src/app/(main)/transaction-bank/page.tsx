"use client";
import React, { useEffect, useState } from "react";
import Menu from "@/app/components/menu/menu";
import ClipLoader from "react-spinners/ClipLoader";
import DataCard from "@/app/components/card/DataCard";

const TransactionBankPage = () => {
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
        <h1 className="text-3xl font-bold mb-6 block md:hidden">
          Cargar dinero
        </h1>
        <DataCard />
      </main>
    </div>
  );
};

export default TransactionBankPage;
