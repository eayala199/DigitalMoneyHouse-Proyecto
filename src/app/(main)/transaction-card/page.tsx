"use client";
import React from "react";
import Menu from "@/app/components/menu/menu";
import TransactionCardCard from "@/app/components/card/TransactionCardCard";

const TransactionCardPage: React.FC = () => {

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
