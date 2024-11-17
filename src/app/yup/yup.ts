import * as yup from "yup";

// Esquema para validación del número de cuenta
export const accountSchema = yup.object({
  accountNumber: yup
    .string()
    .matches(
      /^[^2]\d{10}$/,
      "El número de cuenta debe tener 11 dígitos y no puede comenzar con '2'."
    )
    .required("Completá los campos requeridos."),
});

// Esquema para validación del email
export const emailSchema = yup
  .object({
    email: yup
      .string()
      .email("El formato del email es inválido. Ejemplo: email@gmail.com")
      .required("Completá los campos requeridos."),
  })
  .required();

// Esquema para validación de la contraseña
export const passwordSchema = yup
  .object({
    password: yup
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(20, 'La contraseña no puede tener más de 20 caracteres')
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, 'La contraseña debe contener al menos 1 carácter especial, una mayúscula y un número')
      .required('La contraseña es obligatoria'),
  })
  .required();

// Esquema para validación de nombre (firstname y lastname)
const nameSchema = yup
  .string()
  .matches(/^[A-Za-z]+$/, "El campo debe contener solo letras")
  .required("Completá los campos requeridos.");

// Esquema opcional para teléfono
const optionalPhoneSchema = yup
  .string()
  .matches(/^\d+$/, "El teléfono debe contener solo números")
  .optional();

// Esquema para validación del formulario de registro
export const signupSchema = yup
  .object({
    firstname: yup
      .string()
      .matches(
        /^[A-Za-zÀ-ÖØ-Ýà-öø-ÿÑñ]*$/,
        "El campo debe contener solo letras."
      )
      .min(3, "El nombre debe tener al menos 3 letras.")
      .required("Completá los campos requeridos."),
    lastname: yup
      .string()
      .matches(
        /^[A-Za-zÀ-ÖØ-Ýà-öø-ÿÑñ]*$/,
        "El campo debe contener solo letras."
      )
      .min(3, "El apellido debe tener al menos 3 letras.")
      .required("Completá los campos requeridos."),
    dni: yup.number().required("Completá los campos requeridos."),
    email: yup
      .string()
      .email("El formato del email es inválido.")
      .required("Completá los campos requeridos."),
    password: yup
      .string()
      .min(6, "La contraseña debe tener 6 caracteres como mínimo.")
      .max(20, "La contraseña debe tener 20 caracteres como máximo.")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,20}$/,
        "La contraseña debe contener al menos 1 carácter especial, una mayúscula y un número."
      )
      .required("Completá los campos requeridos."),
    passwordConfirmed: yup
      .string()
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden.")
      .required("Completá los campos requeridos."),
    phone: yup
      .string()
      .matches(/^\d{10}$/, "El teléfono debe contener exactamente 10 números.")
      .required("Completá los campos requeridos."),
  })
  .required();


// Esquema para validación de tarjeta actualizado
export const cardScheme = yup
  .object({
    cardNumber: yup
      .string()
      .matches(/^\d{16}$/, "El número de tarjeta debe tener exactamente 16 dígitos.")
      .required("Completá los campos requeridos."),
    expiry: yup
      .string()
      .matches(
        /^(0[1-9]|1[0-2])\/\d{2}$/,
        "El formato de vencimiento debe ser MM/YY, con 2 dígitos para el mes y 2 dígitos para el año."
      )
      .required("Completá los campos requeridos."),
    fullName: yup
      .string()
      .matches(
        /^[A-Za-zÀ-ÖØ-Ýà-öø-ÿÑñ\s]*$/,
        "El campo debe contener solo letras y espacios."
      )
      .required("Completá los campos requeridos."),
    cvc: yup
      .string()
      .matches(/^\d{3}$/, "El código de seguridad debe tener exactamente 3 dígitos.")
      .required("Completá los campos requeridos."),
  })
  .required();

