import dayjs from 'dayjs';
import { Formik, Form as FormikForm } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { parseSelect } from '../../../adapters';
import { useAppContext } from '../../../context';
import { api } from '../../../services';
import { Button, FormControl, SelectControl } from '../../../ui';
import { normalizeText, parseDate } from '../../../utilities';

import validationSchema from './ValidationSchema';

const Examenes = ({ closeModal }) => {
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [turnos, setTurnos] = useState([]);

  const {
    state: { current },
    actions,
  } = useAppContext();

  const { view } = useParams();

  const getFromApi = async () => {
    const alumnos = await api.get('read/alumnos');
    const materias = await api.get('read/materias');
    const turnos = await api.get('turnos');

    setAlumnos(alumnos.data);
    setTurnos(turnos.data);
    setMaterias(materias.data);
  };

  const _initialValues = {
    nro_legajo_a: current !== null ? current.data.nro_legajo_a : '',
    cod_mat:
      current !== null && current.data.cod_mat ? current.data.cod_mat : '',
    cod_turno:
      current !== null && current.data.cod_turno ? current.data.cod_turno : '',
    año: current !== null && current.data.año ? current.data.año : '',
    nota: current !== null && current.data.nota ? current.data.nota : '',
    fecha_inscripcion:
      current !== null && current.data.fecha_inscripcion
        ? parseDate(current.data.fecha_inscripcion)
        : '',
    fecha_examen:
      current !== null && current.data.fecha_examen
        ? parseDate(current.data.fecha_examen)
        : '',
  };

  useEffect(() => {
    getFromApi();
  }, []);

  return (
    <Formik
      initialValues={_initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        values.nro_legajo_a = Number(values.nro_legajo_a);
        values.nota = Number(values.nota);

        values.fecha_inscripcion = dayjs(new Date().getDate()).format(
          'YYYY-MM-DD'
        );

        if (values.fecha_examen !== '') {
          values.fecha_examen = dayjs(values.fecha_examen).format('YYYY-MM-DD');

          values.año = new Date(values.fecha_examen).getFullYear().toString();
        } else {
          values.fecha_examen = null;
          values.año = null;
        }

        console.log(values);
        if (current !== null) {
          actions.updateItem(view, values);
        } else {
          actions.createItem(view, values);
        }
        closeModal();
      }}
    >
      {({ errors, touched }) => (
        <FormikForm>
          <SelectControl
            errors={
              errors.nro_legajo_a && touched.nro_legajo_a
                ? errors.nro_legajo_a
                : null
            }
            label={'Alumno'}
            name={'nro_legajo_a'}
            options={parseSelect(
              normalizeText(alumnos),
              'nro_legajo_a',
              'ape_nomb'
            )}
          />
          <SelectControl
            errors={errors.cod_mat && touched.cod_mat ? errors.cod_mat : null}
            label={'Materia'}
            name={'cod_mat'}
            options={parseSelect(
              normalizeText(materias),
              'cod_materia',
              'desc_mat'
            )}
          />
          <SelectControl
            errors={
              errors.cod_turno && touched.cod_turno ? errors.cod_turno : null
            }
            label={'Turno'}
            name={'cod_turno'}
            options={parseSelect(
              normalizeText(turnos),
              'cod_turno',
              'desc_turno'
            )}
          />
          <FormControl
            errors={
              errors.fecha_examen && touched.fecha_examen
                ? errors.fecha_examen
                : null
            }
            label={'Fecha de Examen'}
            name={'fecha_examen'}
            type={'date'}
          />
          <FormControl
            errors={errors.nota && touched.nota ? errors.nota : null}
            label={'Nota'}
            name={'nota'}
          />
          <Button
            styles={`bg-blue-500 hover:bg-blue-600 m-auto px-[2rem]`}
            text={'Enviar'}
            type={'submit'}
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default Examenes;
