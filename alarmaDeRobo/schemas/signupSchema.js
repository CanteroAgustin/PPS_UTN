import * as yup from 'yup'

export const signupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("🚨 Ingrese un email valido 🚨")
    .required('🚨 El email es requerido 🚨'),
  password: yup
    .string()
    .min(6, ({ min }) => `🚨 El password debe tener al menos ${min} caracteres 🚨`)
    .required('🚨 El password es requerido 🚨'),
})