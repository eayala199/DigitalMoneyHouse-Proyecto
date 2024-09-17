'use client';
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema } from '../../yup/yup';
import InputText from '@/app/components/inputs/InputText';
import ContinueButton from '../../components/buttons/ContinueButton';
import ClipLoader from "react-spinners/ClipLoader";

const LoginPasswordPage = () => {
  const methods = useForm({
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
  });

  const { formState, control } = methods;
  const passwordValue = useWatch({ control, name: 'password' });
  const isPasswordValid = formState.isValid && passwordValue !== '';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"lime"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="text-2xl font-bold">Ingresá tu contraseña</h1>
      <FormProvider {...methods}>
        <form className="flex flex-col space-y-4 py-4" onSubmit={(e) => e.preventDefault()}>
          <InputText
            type="password"
            placeholder="Contraseña"
            fieldName="password"
          />
          {formState.errors.password && (
            <p className="text-red-500 text-[15px] w-[360px]">
              {formState.errors.password.message}
            </p>
          )}
          <ContinueButton isEnabled={isPasswordValid} />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPasswordPage;
