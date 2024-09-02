import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ProfileButton = () => {
  return (
    <button className="flex items-center justify-between w-[1003px] h-[116px] mt-6 p-4 bg-lime-500 hover:bg-lime-600 text-black rounded-lg shadow-lg">
      <span className="font-bold">Gestioná los medios de pago</span>
      <FontAwesomeIcon icon={faArrowRight} className="text-black" />
    </button>
  );
}

export default ProfileButton;
