"use client";
import React, { useEffect, useState } from 'react';
import UserAPI from '../../../services/users/users.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

interface User {
  dni: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
}

const AccountCard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtén el token desde localStorage

    if (token) {
      try {
        // Decodifica el token manualmente
        const payload = token.split('.')[1]; // Obtener la parte del payload del token JWT
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        console.log('Decoded Payload:', decodedPayload); // Verificar el contenido del payload

        const username = decodedPayload.username || decodedPayload.id; // Asegúrate de extraer el campo correcto
        console.log('Username (ID):', username); // Verificar el username extraído

        if (!username) {
          setError('Username no encontrado en el token');
          setLoading(false);
          return;
        }

        // Llama a la API para obtener los datos del usuario
        UserAPI.getUserData(token, username)
          .then((data) => {
            console.log('User data:', data);
            setUser(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error('API Error:', err);
            setError('Error al obtener los datos del usuario');
            setLoading(false);
          });
      } catch (err) {
        console.error('Token Decoding Error:', err);
        setError('Error al decodificar el token');
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError('Token no encontrado en el localStorage');
    }
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg p-6 w-[1003px] rounded-[10px] border border-gray-300">
      <h2 className="text-xl font-bold mb-4">Tus datos</h2>
      <div className="space-y-2">
        <div className="flex gap-x-2 items-center">
          <label className="text-gray-700">Email:</label>
          <p>{user?.email}</p>
          <FontAwesomeIcon icon={faPen} className="ml-2 text-gray-500 cursor-pointer" />
        </div>
        <div className="flex gap-x-2 items-center">
          <label className="text-gray-700">Nombre y apellido:</label>
          <p>{user?.firstname} {user?.lastname}</p>
          <FontAwesomeIcon icon={faPen} className="ml-2 text-gray-500 cursor-pointer" />
        </div>
        <div className="flex gap-x-2 items-center">
          <label className="text-gray-700">Teléfono:</label>
          <p>{user?.phone}</p>
          <FontAwesomeIcon icon={faPen} className="ml-2 text-gray-500 cursor-pointer" />
        </div>
        <div className="flex gap-x-2 items-center">
          <label className="text-gray-700">DNI:</label>
          <p>{user?.dni}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
