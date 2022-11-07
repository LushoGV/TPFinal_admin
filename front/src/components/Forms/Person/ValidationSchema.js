import * as Yup from 'yup';

const validationSchema = Yup.object({
  nro_legajo_a: Yup.number(),
  ape_nomb: Yup.string().max(30, 'Se aceptan maximo 30 caracteres'),
  nro_doc: Yup.number(),
  direccion: Yup.string().max(50, 'Se aceptan maximo 50 caracteres'),
  email: Yup.string().max(20, 'Se aceptan maximo 20 caracteres'),
  cod_doc: Yup.number(),
  sexo: Yup.string().max(1),
  fec_nac: Yup.date(),
  est_civil: Yup.string(),
});

export default validationSchema;
