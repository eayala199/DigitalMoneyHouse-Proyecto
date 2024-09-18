"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import AccountAPI from "../../../services/Account/account.service";
import { transactionsAPI } from "../../../services/transactions/transactions.service";

interface Activity {
  id: number;
  description: string;
  dated: string;
  amount: number;
}

const ActivityList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isClient, setIsClient] = useState(false);
  const [path, setPath] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    setIsClient(true);
    setPath(window.location.pathname);
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");
        const accountAPI = new AccountAPI();
        const accountData = await accountAPI.getAccountInfo(token);
        const accountId = accountData.id;
        let transactions = await transactionsAPI.getAllTransactions(accountId);
        transactions = transactions.sort((a: Activity, b: Activity) =>
          new Date(b.dated).getTime() - new Date(a.dated).getTime()
        );
        if (selectedFilter) {
          const now = new Date();
          let startDate: Date;
          let endDate: Date;
          switch (selectedFilter) {
            case "hoy":
              startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
              endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
              break;
            case "ayer":
              startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
              endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
              break;
            case "ultima-semana":
              startDate = new Date(now.setDate(now.getDate() - 7));
              endDate = new Date();
              break;
            case "ultimos-dias":
              startDate = new Date(now.setDate(now.getDate() - 15));
              endDate = new Date();
              break;
            case "ultimo-mes":
              startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
              endDate = new Date();
              break;
            case "ultimo-ano":
              startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
              endDate = new Date();
              break;
            default:
              startDate = new Date(0);
              endDate = new Date();
          }
          transactions = transactions.filter(
            (activity: Activity) => new Date(activity.dated) >= startDate && new Date(activity.dated) < endDate
          );
        }
        setActivities(transactions);
        setFilteredActivities(transactions);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, [selectedFilter]);

  useEffect(() => {
    const filtered = activities.filter((activity) =>
      activity?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredActivities(filtered);
    setCurrentPage(1);
  }, [searchTerm, activities]);

  const indexOfLastActivity = currentPage * itemsPerPage;
  const indexOfFirstActivity = indexOfLastActivity - itemsPerPage;
  const currentActivities =
    path === "/home"
      ? filteredActivities.slice(0, itemsPerPage)
      : filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const goToActivityPage = () => {
    window.location.href = "/activity";
  };

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const applyFilter = () => {
    const selectedOption = document.querySelector(
      'input[name="filter"]:checked'
    )?.id;
    setSelectedFilter(selectedOption || "");
    setShowFilterMenu(false);
  };

  const clearFilters = () => {
    setSelectedFilter("");
    setFilteredActivities(activities);
    setSearchTerm("");
    setShowFilterMenu(false);
  };

  const handleActivityClick = (activityId: number) => {
    localStorage.setItem("selectedTransactionId", activityId.toString());
    window.location.href = "/activity2";
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-4 w-full max-w-[350px] sm:max-w-[511px] lg:max-w-[1006px]">
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
        {isClient && path === "/activity" && (
          <button
            onClick={toggleFilterMenu}
            className="ml-4 px-4 py-2 bg-lime-500 text-black rounded-[10px] flex items-center"
          >
            <span className="mr-2 font-bold">Filtrar</span>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        )}
      </div>
      {showFilterMenu && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-4">
          <h3 className="text-lg font-semibold mb-2">Filtrar por período</h3>
          <ul className="space-y-2">
            <li>
              <input type="radio" id="hoy" name="filter" />
              <label htmlFor="hoy" className="ml-2">
                Hoy
              </label>
            </li>
            <li>
              <input type="radio" id="ayer" name="filter" />
              <label htmlFor="ayer" className="ml-2">
                Ayer
              </label>
            </li>
            <li>
              <input type="radio" id="ultima-semana" name="filter" />
              <label htmlFor="ultima-semana" className="ml-2">
                Última semana
              </label>
            </li>
            <li>
              <input type="radio" id="ultimos-dias" name="filter" />
              <label htmlFor="ultimos-dias" className="ml-2">
                Últimos 15 días
              </label>
            </li>
            <li>
              <input type="radio" id="ultimo-mes" name="filter" />
              <label htmlFor="ultimo-mes" className="ml-2">
                Último mes
              </label>
            </li>
            <li>
              <input type="radio" id="ultimo-ano" name="filter" />
              <label htmlFor="ultimo-ano" className="ml-2">
                Último año
              </label>
            </li>
          </ul>
          <button
            className="mt-4 px-4 py-2 bg-lime-500 text-black rounded-[10px]"
            onClick={applyFilter}
          >
            Aplicar
          </button>
          <button
            className="mt-2 ml-4 px-4 py-2 bg-red-500 text-black rounded-[10px]"
            onClick={clearFilters}
          >
            <FontAwesomeIcon icon={faTimes} className="mr-2" />
            Borrar filtros
          </button>
        </div>
      )}
      <div className="bg-white rounded-lg shadow p-4 w-full mt-6">
        <h2 className="text-lg font-semibold mb-4">Tu actividad</h2>
        {filteredActivities.length === 0 ? (
          <p className="text-center text-gray-500">
            No se encontró ninguna actividad
          </p>
        ) : (
          <ul className="space-y-4">
            {currentActivities.map((activity, index) => (
              <li
                key={index}
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleActivityClick(activity.id)}
              >
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-lime-500 rounded-full mr-2"></span>
                  <span>{activity.description}</span>
                </div>
                <div className="text-right">
                  <span>${activity.amount.toFixed(2)}</span>
                  <div className="text-sm text-gray-500">
                    {new Date(activity.dated).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {isClient && path === "/activity" && totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`mx-1 px-3 py-1 rounded-md ${
                  i + 1 === currentPage
                    ? "bg-lime-500 text-black"
                    : "bg-gray-300 text-gray-600"
                }`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {isClient && path !== "/activity" && (
        <div>
          <button
            className="mt-4 text-black font-bold hover:underline"
            onClick={goToActivityPage}
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityList;
