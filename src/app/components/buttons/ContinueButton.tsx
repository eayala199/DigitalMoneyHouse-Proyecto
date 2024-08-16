import React from "react";
import Link from "next/link";

type ContinueButtonProps = {
  isEnabled: boolean;
};

const ContinueButton = ({ isEnabled }: ContinueButtonProps) => {
  return (
    <Link href={isEnabled ? "/login-password" : "#"}>
      <div
        className={`w-[360px] h-[64px] ${isEnabled ? 'bg-lime-500 text-black' : 'bg-gray-500 text-gray-400'} px-4 py-2 rounded-[10px] font-bold text-center border ${isEnabled ? 'border-lime-500' : 'border-gray-500'} pt-4 cursor-${isEnabled ? 'pointer' : 'not-allowed'}`}
      >
        Continuar
      </div>
    </Link>
  );
};

export default ContinueButton;