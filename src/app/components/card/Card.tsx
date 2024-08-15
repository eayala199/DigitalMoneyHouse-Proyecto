import React from "react";

type CardProps = {
  title: string;
  content: string;
};

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="w-[500px] h-[246px] bg-white rounded-[30px] shadow-lg">
      <div className="p-6">
        <h2 className="text-[34px] font-bold mb-4">{title}</h2>
        <div className="h-1 bg-lime-500 mb-4"></div>
        <p className="text-[18px] font-normal text-black">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Card;
