"use client";
import React, { useEffect, useState } from "react";
import Menu from "@/app/components/menu/menu";
import ClipLoader from "react-spinners/ClipLoader";
import AccountAPI from "../../../services/Account/account.service";
import { TransferencesService } from "../../../services/transferences/transferences.service";
import Swal from "sweetalert2"; 

interface TransactionCard2pageProps {
  cardInfo: {
    id: number;
    lastFourDigits: string;
  };
}

const TransactionCard2page: React.FC = () => {
  const [cardInfo, setCardInfo] = useState<
    TransactionCard2pageProps["cardInfo"] | null
  >(null);
  const [amount, setAmount] = useState<number | string>(""); 
  const [cvu, setCvu] = useState<string>(""); 
  const [accountId, setAccountId] = useState<number | null>(null); 

  const accountService = new AccountAPI();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const cardId = searchParams.get("cardId");
    const lastFourDigits = searchParams.get("lastFourDigits");

    if (cardId && lastFourDigits) {
      setCardInfo({
        id: Number(cardId), 
        lastFourDigits: lastFourDigits,
      });
    }

    const fetchAccountInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const accountData = await accountService.getAccountInfo(token);
          setCvu(accountData.cvu);
          setAccountId(accountData.id); 
        }
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

    fetchAccountInfo();
  }, []);

  const getArgentinaDate = () => {
    const currentDate = new Date();
    const offset = -3 * 60; 
    const argentinaDate = new Date(currentDate.getTime() + offset * 60000);
    return argentinaDate.toISOString();
  };

  // Función para manejar el depósito
  const handleDeposit = async () => {
    if (accountId && amount && cardInfo && cvu) {
      const depositData = {
        amount: Number(amount),
        dated: getArgentinaDate(), 
        destination: cvu, 
        origin: cvu, 
      };

      Swal.fire({
        title: "Confirmar depósito",
        text: `¿Estás seguro de que deseas depositar $${amount} de la tarjeta terminada en: ${cardInfo.lastFourDigits}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, depositar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem("token"); 
            if (token) {
              const transferService = new TransferencesService(
                accountId,
                token
              ); 
              await transferService.createDeposit(depositData); 

              const url = new URL("/transaction-card3", window.location.origin);
              url.searchParams.append("amount", amount.toString());
              url.searchParams.append("date", getArgentinaDate());
              url.searchParams.append(
                "lastFourDigits",
                cardInfo.lastFourDigits
              );

              window.location.href = url.toString();
            }
          } catch (error) {
            console.error("Error realizando el depósito:", error);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema realizando el depósito.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        }
      });
    }
  };

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
        <h1 className="text-3xl mb-4 font-bold block md:hidden">
          Cargar dinero
        </h1>
        <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-screen-md sm:max-w-[350px] md:max-w-[513px] lg:max-w-[1006px] h-[306px] relative">
          <h2 className="text-lime-500 font-bold text-xl absolute top-6 left-9">
            ¿Cuánto querés ingresar a la cuenta?
          </h2>
          {cardInfo ? (
            <div className="mt-12 ml-4">
              <input
                type="number"
                placeholder="$0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full max-w-[360px] h-[64px] p-2 mt-4 text-black bg-white rounded-md mb-4"
              />
              <button
                onClick={handleDeposit}
                disabled={!amount} 
                className={`absolute font-bold bottom-8 right-6 w-full max-w-[233px] h-[48px] rounded-[10px] ${
                  amount ? "bg-lime-500" : "bg-gray-400"
                } text-black`}
              >
                Continuar
              </button>
            </div>
          ) : (
            <p>Cargando información de la tarjeta...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default TransactionCard2page;
