import * as Yup from 'yup';

const validationSchema = Yup.object({
  nro_legajo_a: Yup.number().required('Campo obligatorio'),
  cod_mat: Yup.string()
    .required('Campo obligatorio')
    .max(5, 'Se aceptan maximo 5 caracteres.'),
  cod_turno: Yup.string()
    .required('Campo obligatorio')
    .max(5, 'Se aceptan maximo 5 caracteres.'),
  año: Yup.number(),
  nota: Yup.number()
    .typeError('Solo se aceptan numeros.')
    .max(10, 'Nota máxima: 10')
    .min(0, 'Nota mínima: 0'),
  fecha_examen: Yup.date(),
  fecha_inscripcion: Yup.date(),
});

export default validationSchema;
