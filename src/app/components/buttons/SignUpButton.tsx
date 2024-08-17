import React from 'react'
import Link from "next/link";

const SignUpButton = () => {
  return (
    <Link href="/login">
      <div className="w-[360px] h-[64px] bg-lime-500 text-black px-4 py-2 rounded-[10px] font-bold text-center pt-4 cursor-pointer mb-2">
        Crear cuenta
      </div>
    </Link>
  )
}

export default SignUpButton