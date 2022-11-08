import * as Yup from 'yup';

const validationSchema = Yup.object({
  cod_materia: Yup.string()
    .required('Campo obligatorio.')
    .max(5, 'Se aceptan maximo 5 caracteres.'),
  desc_mat: Yup.string()
    .required('Campo obligatorio.')
    .max(30, 'Se aceptan maximo 30 caracteres.'),
  desc_carrera: Yup.string()
    .required('Campo obligatorio.')
    .max(30, 'Se aceptan maximo 30 caracteres.'),
  nro_legajo_p: Yup.number()
    .required('Campo obligatorio.')
    .typeError('Solo se aceptan numeros.'),
});

export default validationSchema;
