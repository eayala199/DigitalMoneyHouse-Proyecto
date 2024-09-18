"use client"
import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema } from '../../yup/yup'; 
import InputText from '@/app/components/inputs/InputText';
import ContinueButton from '../../components/buttons/ContinueButton';
import CreateAccountButtonGray from '../../components/buttons/CreateAccountButtonGray';
import ClipLoader from "react-spinners/ClipLoader";

type FormData = {
  email: string;
};

const LoginPage = () => {
  const methods = useForm({
    resolver: yupResolver(emailSchema),
    mode: 'onChange',
  });

  const { handleSubmit, formState, control } = methods;
  const emailValue = useWatch({ control, name: 'email' });
  const isEmailValid = !formState.errors.email && emailValue?.includes('@') && emailValue !== '';

  const onSubmit = (data:FormData) => {
    sessionStorage.setItem('email', data.email);
    window.location.href='/login/password';
  };
  
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
      <h1 className="text-2xl font-bold">¡Hola! Ingresá tu e-mail</h1>
      <FormProvider {...methods}>
        <form className="flex flex-col space-y-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <InputText
            type="email"
            placeholder="Correo electrónico"
            fieldName="email"
          />
          {formState.errors.email && <p className="text-red-500">{formState.errors.email.message}</p>}
          <ContinueButton isEnabled={isEmailValid} />
          <CreateAccountButtonGray />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;
