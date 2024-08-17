"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const bgColor = pathname === "/login" || pathname === "/login-password" || pathname === "/sign-up" ? "bg-lime-500" : "bg-black";
  const logo = pathname === "/login" || pathname === "/login-password" || pathname === "/sign-up" ? "/assets/logo-black.png" : "/assets/logo.png";

  return (
    <div className={`${bgColor} h-16 w-full flex justify-between items-center px-4`}>
      <div className="text-white font-bold">
        <Link href="/">
          <img src={logo} alt="Logo" className="h-7 w-auto mr-4" />
        </Link>
      </div>
      {pathname !== "/login" && pathname !== "/login-password" && pathname !== "/sign-up" && (
        <div className="flex space-x-4">
          <Link href="/login">
            <div className="bg-black text-lime-500 px-4 py-2 rounded border border-lime-500 font-bold">
              Ingresar
            </div>
          </Link>
          <Link href="/sign-up">
          <button className="bg-lime-500 text-black px-4 py-2 rounded font-bold">
            Crear cuenta
          </button>
          </Link>
          
        </div>
      )}
      {pathname === "/sign-up" && (
      <Link href="/login">
        <div className="bg-black text-white px-4 py-2 rounded font-bold">
          Iniciar sesion
        </div>
      </Link>
      )}
    </div>
  );
};

export default Navbar;
