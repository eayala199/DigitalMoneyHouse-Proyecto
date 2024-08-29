"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AccountAPI from "../../../services/Account/account.service"; 
import { transactionsAPI } from "../../../services/transactions/transactions.service"; 

const ActivityList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegúrate de tener el token almacenado
        if (!token) throw new Error("Token no encontrado");

        // Llamar al servicio AccountAPI para obtener el accountId
        const accountAPI = new AccountAPI();
        const accountData = await accountAPI.getAccountInfo(token);
        const accountId = accountData.id;

        // Llamar al servicio TransactionsAPI para obtener las transacciones
        let transactions = await transactionsAPI.getAllTransactions(accountId);
        
        // Ordenar las transacciones por fecha más reciente primero
        transactions = transactions.sort((a, b) => new Date(b.dated) - new Date(a.dated));

        // Almacenar las primeras 4 transacciones ordenadas
        setActivities(transactions.slice(0, 4));
        setFilteredActivities(transactions.slice(0, 4));
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    // Filtrar actividades basado en el término de búsqueda
    const filtered = activities.filter(activity =>
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredActivities(filtered);
  }, [searchTerm, activities]);

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-4 w-[1006px]">
      <div className="relative flex items-center mb-4">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 text-gray-400"
        />
        <input
          type="text"
          placeholder="Buscar en tu actividad"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-[10px] pl-12 pr-4"
        />
      </div>

      {/* Lista de Actividades */}
      <div className="bg-white rounded-lg shadow p-4 w-full mt-6">
        <h2 className="text-lg font-semibold mb-4">Tu actividad</h2>
        <ul className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="w-4 h-4 bg-lime-500 rounded-full mr-2"></span>
                <span>{activity.description}</span>
              </div>
              <div className="text-right">
                <span>{`$${activity.amount.toFixed(2)}`}</span>
                <div className="text-sm text-gray-500">{new Date(activity.dated).toLocaleDateString()}</div>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-4 text-blue-500 hover:underline">
          Ver toda tu actividad
        </button>
      </div>
    </div>
  );
};

export default ActivityList;
