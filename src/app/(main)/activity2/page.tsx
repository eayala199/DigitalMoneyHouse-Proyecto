"use client";
import React, { useEffect, useState } from "react";
import Menu from "@/app/components/menu/menu";
import { transactionsAPI } from "../../../services/transactions/transactions.service";
import AccountAPI from "../../../services/Account/account.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";

// Define la interfaz para el tipo de transacción
interface Transaction {
  id: string;
  dated: string;
  amount: number;
  description: string;
  type: string;
  origin?: string;
  destination?: string;
}

const Activity2Page = () => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const accountAPI = new AccountAPI();

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const transactionId = localStorage.getItem("selectedTransactionId");
        const token = localStorage.getItem("token");

        if (transactionId && token) {
          const accountInfo = await accountAPI.getAccountInfo(token);
          const accountId = accountInfo.id;

          const transactionData = await transactionsAPI.getTransaction(
            accountId,
            transactionId
          );
          setTransaction(transactionData);
        }
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, []);

  const handleGoHome = () => {
    window.location.href = "/home";
  };

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
    <div className="flex min-h-screen">
      <Menu />
      <main className="flex-1 p-8 flex flex-col items-center">
        <h1 className="block text-2xl font-bold mb-4 sm:hidden">Actividad</h1>
        {loading ? (
          <p className="text-white">Cargando detalles de la transacción...</p>
        ) : transaction ? (
          <>
            <div className="bg-black rounded-lg shadow p-6 sm:w-[350px] md:w-[511px] lg:w-[1006px] text-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center text-lime-500">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-lime-500 mr-2"
                  />
                  Aprobada
                </h2>
                <span>{new Date(transaction.dated).toLocaleString()}</span>
              </div>

              {transaction.type === "Deposit" ? (
                <>
                  <p className="mb-4">
                    <strong className="text-lime-500">Descripción:</strong>{" "}
                    {transaction.description}
                  </p>
                  <p className="mb-4">
                    <strong className="text-lime-500">El monto de:</strong>{" "}
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <p className="mb-4">
                    <strong className="text-lime-500">Desde una cuenta propia.</strong>
                  </p>
                  <p className="mb-4">
                    <strong className="text-lime-500">Número de transacción:</strong>{" "}
                    {transaction.id}
                  </p>
                </>
              ) : transaction.type === "Transfer" ? (
                <>
                  <p className="mb-4">
                    <strong className="text-lime-500">Descripción:</strong>{" "}
                    {transaction.description}
                  </p>
                  <p className="mb-4">
                    <strong className="text-lime-500">El monto de:</strong>{" "}
                    ${transaction.amount.toFixed(2)}
                  </p>
                  {transaction.amount < 0 ? (
                    <p className="mb-4">
                      <strong className="text-lime-500">Hacia:</strong>{" "}
                      {transaction.destination}
                    </p>
                  ) : (
                    <p className="mb-4">
                      <strong className="text-lime-500">Desde:</strong>{" "}
                      {transaction.origin}
                    </p>
                  )}
                  <p className="mb-4">
                    <strong className="text-lime-500">Número de transacción:</strong>{" "}
                    {transaction.id}
                  </p>
                </>
              ) : transaction.type === "Transaction" ? (
                <>
                  <p className="mb-4">
                    <strong className="text-lime-500">Descripción:</strong>{" "}
                    {transaction.description}
                  </p>
                  <p className="mb-4">
                    <strong className="text-lime-500">Monto:</strong>{" "}
                    ${transaction.amount.toFixed(2)}
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-4">
                    <strong className="text-lime-500">Descripción:</strong>{" "}
                    {transaction.description}
                  </p>
                  <p className="mb-4">
                    <strong className="text-lime-500">Monto:</strong>{" "}
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <p className="mb-4">
                    <strong className="text-lime-500">Fecha:</strong>{" "}
                    {new Date(transaction.dated).toLocaleDateString()}
                  </p>
                  {transaction.type !== "Deposit" && (
                    <>
                      {transaction.type !== "Transfer" || transaction.amount >= 0 ? (
                        <p className="mb-4">
                          <strong className="text-lime-500">Origen:</strong>{" "}
                          {transaction.origin}
                        </p>
                      ) : null}
                      {transaction.type !== "Transfer" || transaction.amount <= 0 ? (
                        <p className="mb-4">
                          <strong className="text-lime-500">Destino:</strong>{" "}
                          {transaction.destination}
                        </p>
                      ) : null}
                    </>
                  )}
                  <p className="mb-4">
                    <strong className="text-lime-500">Tipo:</strong>{" "}
                    {transaction.type}
                  </p>
                </>
              )}
            </div>
            <div className="flex justify-end sm:w-[350px] md:w-[511px] lg:w-[1006px] mt-4">
              <button
                className="font-bold bg-gray-500 text-black px-4 py-2 rounded mr-2"
                onClick={handleGoHome}
              >
                Ir al inicio
              </button>
              <button className="bg-lime-500 text-black px-4 py-2 rounded font-bold">
                Descargar comprobante
              </button>
            </div>
          </>
        ) : (
          <p className="text-white">No se encontró la transacción.</p>
        )}
      </main>
    </div>
  );
};

export default Activity2Page;
