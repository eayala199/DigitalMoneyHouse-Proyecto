"use client";
import React from "react";
import Menu from "@/app/components/menu/menu";
import DataCard from "@/app/components/card/DataCard";

const TransactionBankPage = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <DataCard/>
      </main>
    </div>
  );
};

export default TransactionBankPage;
