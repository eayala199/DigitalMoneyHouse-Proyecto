"use client";
import React from "react";
import Menu from "@/app/components/menu/menu";
import TransactionCard from "@/app/components/card/TransactionCard";
import { faMoneyBillTransfer, faCreditCard } from "@fortawesome/free-solid-svg-icons";

const TransactionPage = () => {
  const handleTransferenciaBancariaClick = () => {
    window.location.href = "/transaction-bank";
  };

  const handleSeleccionarTarjetaClick = () => {
    window.location.href = "/transaction-card";
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        {/* Mostrar el título solo en dispositivos móviles */}
        <h1 className="text-3xl font-bold mb-6 block md:hidden">
          Cargar dinero
        </h1>

        <TransactionCard
          icon={faMoneyBillTransfer}
          text="Transferencia bancaria"
          onClick={handleTransferenciaBancariaClick}
        />
        <TransactionCard
          icon={faCreditCard}
          text="Seleccionar tarjeta"
          onClick={handleSeleccionarTarjetaClick}
        />
      </main>
    </div>
  );
};

export default TransactionPage;
