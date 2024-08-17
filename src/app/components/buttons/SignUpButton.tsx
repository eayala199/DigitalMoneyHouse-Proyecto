import React from 'react'
import Link from "next/link";

type SignUpButtonProps = {
  isEnabled: boolean;
};

const SignUpButton = ({ isEnabled }: SignUpButtonProps) => {
  return isEnabled ? (
    <Link href="/login">
      <div className="w-[360px] h-[64px] bg-lime-500 text-black px-4 py-2 rounded-[10px] font-bold text-center pt-4 cursor-pointer mb-2">
        Crear cuenta
      </div>
    </Link>
  ) : (
    <div className="w-[360px] h-[64px] bg-lime-500 text-black px-4 py-2 rounded-[10px] font-bold text-center pt-4 cursor-not-allowed pointer-events-none mb-2">
      Crear cuenta
    </div>
  );
};

export default SignUpButton;
