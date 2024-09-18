"use client"
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; 
import cardService from '../../../services/cards/cards.service';
import AccountAPI from '../../../services/Account/account.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface Card {
  id: number;
  number_id: number;
}

const Card1List = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken: string | null = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchAccountInfo = async () => {
        const accountAPI = new AccountAPI();
        try {
          const accountData = await accountAPI.getAccountInfo(token);
          setAccountId(accountData.id);
        } catch (error) {
          console.error("Error fetching account info:", error);
        }
      };

      fetchAccountInfo();
    }
  }, [token]);

  useEffect(() => {
    if (accountId) {
      const fetchCards = async () => {
        try {
          const response = await cardService.getCardsByAccountId(
            accountId,
            token as string
          );
          setCards(response);
        } catch (error) {
          console.error("Error fetching cards:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCards();
    }
  }, [accountId, token]);

  const handleDelete = async (
    accountId: number,
    cardId: number,
    token: string
  ) => {
    try {
      await cardService.deleteCard(accountId, cardId, token);
      setCards(cards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const confirmDelete = (accountId: number, cardId: number, token: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(accountId, cardId, token);
        Swal.fire("Eliminada", "La tarjeta ha sido eliminada.", "success");
      }
    });
  };

  if (loading) {
    return <div>Cargando tarjetas...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-6 mt-4 w-[350px] sm:w-[511px] lg:w-[1006px]">
      <h2 className="text-xl font-semibold mb-4">Tus tarjetas</h2>
      <ul>
        {cards.length > 0 ? (
          cards.map((card) => (
            <li
              key={card?.id}
              className="flex justify-between items-center border-b border-gray-200 py-4"
            >
              <div className="flex items-center">
                <div className="w-4 h-4 bg-lime-400 rounded-full mr-4"></div>
                <p>Terminada en {card?.number_id?.toString().slice(-4)}</p>
              </div>
              <button
                onClick={() =>
                  confirmDelete(accountId as number, card.id, token as string)
                }
                className="text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                <span className="ml-2">Eliminar</span>
              </button>
            </li>
          ))
        ) : (
          <li className="text-black py-4">No hay tarjetas asociadas.</li>
        )}
      </ul>
    </div>
  );
};

export default Card1List;
