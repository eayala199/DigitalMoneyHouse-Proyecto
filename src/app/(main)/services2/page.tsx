/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Menu from "../../components/menu/menu";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountSchema } from "../../yup/yup";

const AccountNumberPage = () => {
  // Inicializar los métodos de react-hook-form con validación en tiempo real
  const methods = useForm({
    resolver: yupResolver(accountSchema),
    mode: "onChange", // Valida en tiempo real cuando el usuario escribe
    reValidateMode: "onChange", // Revalida cada vez que se modifica el input
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    console.log("Número de cuenta válido:", data.accountNumber);

    // Obtener el parámetro 'name' de la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");

    // Redirigir al path /services3 con el parámetro name y accountNumber
    window.location.href = `/services3?name=${name}&accountNumber=${data.accountNumber}`;
  };

  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <h1 className="block text-2xl font-bold mb-4 sm:hidden">
          Pagar servicios
        </h1>
        <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-screen-md sm:max-w-[350px] md:max-w-[513px] lg:max-w-[1006px]">
          <h2 className="text-left text-2xl font-bold mb-6">
            Número de cuenta sin el primer 2
          </h2>

          {/* Envolver el formulario con FormProvider */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <input
                type="text"
                {...methods.register("accountNumber")}
                maxLength={11} // Limitar el input a 11 caracteres
                className={`w-[300px] p-2 mb-4 rounded-lg text-black ${
                  errors.accountNumber ? "border-red-500" : ""
                }`}
                placeholder="37289701912"
              />
              {errors.accountNumber && (
                <p className="text-red-500 mb-4">
                  {errors.accountNumber.message}
                </p>
              )}
              <p className="text-sm text-gray-400 mb-4">
                Son 11 números sin espacios, sin el "2" inicial. Agregá ceros
                adelante si tenés menos.
              </p>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-[233px] h-[50px] py-2 rounded-lg bg-lime-500 text-black font-bold"
                >
                  Continuar
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </main>
    </div>
  );
};

export default AccountNumberPage;
