"use client";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../yup/yup";
import InputText from "@/app/components/inputs/InputText";
import InputNumber from "@/app/components/inputs/InputNumber";
import SignUpButton from "@/app/components/buttons/SignUpButton";

const SignUpPage = () => {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const { handleSubmit, formState, control } = methods;
  const passwordValue = useWatch({ control, name: "password" });
  const isPasswordValid = passwordValue?.length >= 6;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="text-2xl font-bold">Crear Cuenta</h1>
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-2 gap-4 py-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputText type="text" placeholder="Nombre*" fieldName="text" />
          <InputText type="text" placeholder="Apellido*" fieldName="surname" />
          <InputNumber type="number" placeholder="DNI*" fieldName="dni" />
          <InputText type="email" placeholder="Email*" fieldName="email" />
          <div className="col-span-2">
            <p>
              Usa entre 6 y 20 carácteres (debe contener al menos al menos 1
              carácter especial, una mayúscula y un número)
            </p>
          </div>
          <InputText
            type="password"
            placeholder="Contraseña*"
            fieldName="password"
          />
          <InputText
            type="password"
            placeholder="Confirmar contraseña*"
            fieldName="confirmPassword"
          />
          <InputNumber
            type="number"
            placeholder="Teléfono*"
            fieldName="phone"
          />
          <SignUpButton />
          {formState.errors.email && (
            <p className="text-red-500 col-span-2">
              {formState.errors.email.message}
            </p>
          )}
          {formState.errors.password && (
            <p className="text-red-500 col-span-2">
              {formState.errors.password.message}
            </p>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpPage;
