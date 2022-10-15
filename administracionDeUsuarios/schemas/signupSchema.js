import * as yup from 'yup'

export const signupValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, ({ min }) => `❗❗❗ El nombre debe tener al menos ${min} caracteres`)
    .required('❗❗❗ El nombre es requerido'),
  lastName: yup
    .string()
    .min(2, ({ min }) => `❗❗❗ El apellido debe tener al menos ${min} caracteres`)
    .required('❗❗❗ El apellido es requerido'),
  dni: yup
    .string()
    .matches(
      /^\d{8}(?:[-\s]\d{4})?$/,
      "El dni debe tener 8 numeros"
    )
    .required('❗❗❗ El dni es requerido'),
  email: yup
    .string()
    .email("❗❗❗ Ingrese un correo valido")
    .required('❗❗❗ El correo es requerido'),
  password: yup
    .string()
    .min(6, ({ min }) => `❗❗❗ La contraseña debe tener al menos ${min} caracteres`)
    .required('❗❗❗ La contraseña es requerida'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'La contraseña debe coincidir')
})