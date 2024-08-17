'use client';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema} from '../../yup/yup'
import InputText from '@/app/components/inputs/InputText';
import ContinueButton from '../../components/buttons/ContinueButton';

const LoginPasswordPage = () => {
  const methods = useForm({
    resolver: yupResolver(passwordSchema),
    mode: 'onChange', 
  });

  const { handleSubmit, formState, control } = methods;

  const passwordValue = useWatch({ control, name: "password" });

  // Asegurando que se monitoree isValid y el valor de password
  const isPasswordValid = formState.isValid && passwordValue !== "";

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log('FormState:', formState);
  console.log('Password Value:', passwordValue);
  console.log('Is Password Valid:', isPasswordValid);

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
          {formState.errors.password && (
            <p className="text-red-500 text-[15px] w-[360px]">
              {formState.errors.password.message}
            </p>
          )}
        </form>
      </FormProvider>
      <ContinueButton isEnabled={isPasswordValid} />
    </div>
  );
};

export default LoginPasswordPage;
