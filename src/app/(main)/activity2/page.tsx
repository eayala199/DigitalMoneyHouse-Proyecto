"use client";
import React, { useEffect, useState } from "react";
import Menu from "@/app/components/menu/menu";
import { transactionsAPI } from "../../../services/transactions/transactions.service";
import AccountAPI from "../../../services/Account/account.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Activity2Page = () => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const accountAPI = new AccountAPI(); // Crear una instancia del servicio de la cuenta

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const transactionId = localStorage.getItem("selectedTransactionId");
        const token = localStorage.getItem("token");

        if (transactionId && token) {
          // Primero, obtener la información de la cuenta para obtener el accountId
          const accountInfo = await accountAPI.getAccountInfo(token);
          const accountId = accountInfo.id; // Obtener el accountId desde la información de la cuenta

          // Luego, obtener los detalles de la transacción usando el accountId
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

  return (
    <div className="flex">
      <Menu /> {/* El menú siempre será visible */}
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        {loading ? (
          <p>Cargando detalles de la transacción...</p>
        ) : transaction ? (
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold flex items-center">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500 mr-2"
                />
                Aprobada
              </h2>
              <span>{new Date(transaction.dated).toLocaleDateString()}</span>
            </div>
            {transaction.type === "Deposit" ? (
              <>
                <p>
                  <strong>Descripción:</strong> {transaction.description}
                </p>
                <p>
                  <strong>El monto de:</strong>
                </p>
                <p className="text-lg font-semibold">
                  ${transaction.amount.toFixed(2)}
                </p>
                <p>
                  <strong>Desde una cuenta propia.</strong>
                </p>{" "}
                {/* Nuevo texto agregado */}
                <p>
                  <strong>Número de transacción:</strong>
                </p>
                <p className="text-lg font-semibold">{transaction.id}</p>
              </>
            ) : transaction.type === "Transfer" ? (
              <>
                <p>
                  <strong>Descripción:</strong> {transaction.description}
                </p>
                <p>
                  <strong>El monto de:</strong>
                </p>
                <p className="text-lg font-semibold">
                  ${transaction.amount.toFixed(2)}
                </p>
                {transaction.amount < 0 ? (
                  <>
                    <p>
                      <strong>Hacia:</strong>
                    </p>
                    <p className="text-lg font-semibold">
                      {transaction.destination}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Desde:</strong>
                    </p>
                    <p className="text-lg font-semibold">
                      {transaction.origin}
                    </p>
                  </>
                )}
                <p>
                  <strong>Número de transacción:</strong>
                </p>
                <p className="text-lg font-semibold">{transaction.id}</p>
              </>
            ) : (
              <>
                <p>
                  <strong>Descripción:</strong> {transaction.description}
                </p>
                <p>
                  <strong>Monto:</strong> ${transaction.amount.toFixed(2)}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(transaction.dated).toLocaleDateString()}
                </p>
                {transaction.type !== "Deposit" && (
                  <>
                    {/* Solo muestra el campo origen si el tipo no es "Transfer" o el monto no es negativo */}
                    {transaction.type !== "Transfer" ||
                    transaction.amount >= 0 ? (
                      <p>
                        <strong>Origen:</strong> {transaction.origin}
                      </p>
                    ) : null}
                    {/* Solo muestra el campo destino si el tipo no es "Transfer" o el monto no es positivo */}
                    {(transaction.type !== "Transfer" ||
                      transaction.amount <= 0) && (
                      <p>
                        <strong>Destino:</strong> {transaction.destination}
                      </p>
                    )}
                  </>
                )}
                <p>
                  <strong>Tipo:</strong> {transaction.type}
                </p>
              </>
            )}
          </div>
        ) : (
          <p>No se encontró la transacción.</p>
        )}
      </main>
    </div>
  );
};

export default Activity2Page;
