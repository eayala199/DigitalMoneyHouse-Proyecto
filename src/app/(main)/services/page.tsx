"use client";
import React, { useEffect, useState } from 'react';
import { ServiceAPI } from '../../../services/service/service.service'; 
import Menu from '@/app/components/menu/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faSearch } from '@fortawesome/free-solid-svg-icons';
import ClipLoader from "react-spinners/ClipLoader"; 

const ServicePage = () => {
  const [services, setServices] = useState<{ id: number, name: string, date: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ServiceAPI.getAllServiceIds();
        const sortedServices = response.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setServices(sortedServices);
      } catch (error) {
        console.error('Error fetching services', error);
      }
    };
    fetchServices();
  }, []);
  const filteredServices = services.filter(service =>
    service?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSelectService = (serviceName: string) => {
    const encodedServiceName = encodeURIComponent(serviceName);
    window.location.href = `/services2?name=${encodedServiceName}`;
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
        <h1 className="block text-2xl font-bold mb-4 sm:hidden">Pagar servicios</h1>
        <div className="w-full max-w-xl mb-6 relative">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full px-10 py-2 border border-gray-300 rounded-lg shadow-sm"
            placeholder="Buscá entre más de 5,000 empresas"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4">Más recientes</h2>
          <ul>
            {filteredServices.map((service) => (
              <li key={service.id} className="flex justify-between items-center py-2 border-b">
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faBuilding} className="text-gray-500" />
                  <span>{service.name}</span>
                </div>
                <button 
                  className="text-blue-600"
                  onClick={() => handleSelectService(service.name)} 
                >
                  Seleccionar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ServicePage;
