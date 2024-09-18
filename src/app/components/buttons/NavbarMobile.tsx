"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

interface UserInfo {
  firstname: string;
  lastname: string;
}

interface MenuMobileProps {
  userInfo: UserInfo;
  isLoggedIn: boolean;
}

const menuLinks = [
  { href: "/home", name: "Inicio" },
  { href: "/activity", name: "Actividad" },
  { href: "/account", name: "Tu perfil" },
  { href: "/transactions", name: "Cargar dinero" },
  { href: "/services", name: "Pagar servicios" },
  { href: "/card1", name: "Tarjetas" },
];

const NavbarMobile = ({ userInfo, isLoggedIn }: MenuMobileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpecialStyle, setIsSpecialStyle] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;
    if (
      !token &&
      (currentPath === "/login" ||
        currentPath === "/sign-up" ||
        currentPath === "/login-password")
    ) {
      setIsSpecialStyle(true);
    } else {
      setIsSpecialStyle(false);
    }
  }, []);

  const getInitials = (firstname: string, lastname: string) => {
    if (!firstname && !lastname) return "NN";
    return (firstname.charAt(0) || "") + (lastname.charAt(0) || "");
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Quieres cerrar sesión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  const handleNavigation = (href: string) => {
    if (
      href === "/login" ||
      href === "/login-password" ||
      href === "/sign-up"
    ) {
      window.location.href = href;
    } else {
      setIsOpen(false);
    }
  };

  const handleLogoClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    } else {
      window.location.href = "/home";
    }
  };

  return (
    <div className="block md:hidden">
      <div
        className={`h-16 flex justify-between items-center px-4 relative ${
          isSpecialStyle ? "bg-lime-500" : "bg-black"
        }`}
      >
        <div className="text-white font-bold">
          <button onClick={handleLogoClick}>
            <img
              src={
                isSpecialStyle ? "/assets/Logo-black.png" : "/assets/logo.png"
              }
              alt="Logo"
              className="h-7 w-auto"
            />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          {isLoggedIn && (
            <div className="bg-lime-500 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center">
              {getInitials(userInfo.firstname, userInfo.lastname)}
            </div>
          )}
          <button
            onClick={toggleMenu}
            className={`p-2 rounded-full focus:outline-none ${
              isSpecialStyle
                ? "bg-lime-500 text-black"
                : "bg-black text-lime-500"
            }`}
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-lime-500 z-10">
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-lime-500">
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
          <div className="px-4 py-6">
            {!isLoggedIn ? (
              <>
                <a
                  href="/login"
                  className="block px-4 py-2 text-lg hover:bg-lime-500 hover:text-black"
                  onClick={() => handleNavigation("/login")}
                >
                  Ingresar
                </a>
                <a
                  href="/sign-up"
                  className="block px-4 py-2 text-lg hover:bg-lime-500 hover:text-black"
                  onClick={() => handleNavigation("/sign-up")}
                >
                  Crear cuenta
                </a>
              </>
            ) : (
              <>
                <div className="px-4 py-2 text-lg text-white font-bold">
                  Hola, {userInfo.firstname} {userInfo.lastname}
                </div>
                {menuLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-lg hover:bg-lime-500 hover:text-black"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-lg hover:bg-lime-500 hover:text-black"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMobile;
