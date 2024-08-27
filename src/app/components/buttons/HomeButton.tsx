import React from 'react';

interface HomeButtonProps {
  text: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ text }) => {
  return (
    <button className="bg-lime-500 text-black w-[490px] h-[106px] rounded-md shadow-md hover:bg-lime-600 text-[24px]">
      {text}
    </button>
  );
};

export default HomeButton;
