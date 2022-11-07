import * as Yup from 'yup';

const validationSchema = {
  ape_nomb: Yup.string()
    .max(30, 'Se aceptan maximo 30 caracteres.')
    .required('Campo obligatorio'),
  nro_doc: Yup.number()
    .typeError('Solo se admiten numeros.')
    .required('Campo obligatorio'),
  direccion: Yup.string()
    .max(50, 'Se aceptan maximo 50 caracteres.')
    .required('Campo obligatorio'),
  email: Yup.string()
    .max(20, 'Se aceptan maximo 20 caracteres.')
    .required('Campo obligatorio'),
  cod_doc: Yup.string().required('Campo obligatorio'),
  sexo: Yup.string().max(1).required('Campo obligatorio'),
  fec_nac: Yup.date().required('Campo obligatorio'),
  est_civil: Yup.string().required('Campo obligatorio'),
  telefono: Yup.string().required('Campo obligatorio'),
};

export const validationSchema_alumno = Yup.object({
  ...validationSchema,
  nro_legajo_a: Yup.number()
    .required('Campo requerido.')
    .typeError('Solo se admiten numeros.'),
});

export const validationSchema_profesor = Yup.object({
  ...validationSchema,
  nro_legajo_p: Yup.number().required(),
  cod_titulo: Yup.string()
    .max(5, 'Se aceptan maximo 5 caracteres')
    .required('Campo obligatorio'),
});
