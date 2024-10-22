"use client";
import React, { useEffect, useState } from "react";
import Menu from "@/app/components/menu/menu";
import ClipLoader from "react-spinners/ClipLoader";
import TransactionCardCard from "@/app/components/card/TransactionCardCard";

const TransactionCardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color="lime" loading={loading} />
      </div>
    );
  }

  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col justify-center items-center mt-8 min-h-screen">
        <h1 className="text-3xl font-bold block md:hidden">Cargar dinero</h1>
        <TransactionCardCard />
      </main>
    </div>
  );
};

export default TransactionCardPage;
