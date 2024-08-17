'use client'
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../yup/yup'; 
import InputText from '@/app/components/inputs/InputText';
import ContinueButton from '../../components/buttons/ContinueButton';

const LoginPasswordPage = () => {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange', 
  });

  const { handleSubmit, formState, control } = methods;
  const passwordValue = useWatch({ control, name: 'password' });
  const isPasswordValid = passwordValue?.length >= 6;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="text-2xl font-bold">Ingresá tu contraseña</h1>
      <FormProvider {...methods}>
        <form className="flex flex-col space-y-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <InputText
            type="password"
            placeholder="Contraseña"
            fieldName="password"
          />
          {formState.errors.email && <p className="text-red-500">{formState.errors.email.message}</p>}
          {formState.errors.password && <p className="text-red-500">{formState.errors.password.message}</p>}
        </form>
      </FormProvider>
      <ContinueButton isEnabled={isPasswordValid} />
    </div>
  );
};

export default LoginPasswordPage;
