import { Formik, Form as FormikForm } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { parseSelect } from '../../../adapters';
import { useAppContext } from '../../../context';
import { api } from '../../../services';
import { Button, FormControl, SelectControl } from '../../../ui';

import validationSchema from './ValidationSchema';

const Materias = ({ closeModal }) => {
  const [profesores, setProfesores] = useState([]);
  const {
    state: { current },
    actions,
  } = useAppContext();

  const { view } = useParams();

  const getProfesores = async () => {
    const { data, status } = await api.get('read/profesores');

    if (status !== 200) {
      return;
    }
    setProfesores(data);
  };

  const _initialValues = {
    cod_materia: current !== null ? current.data.cod_materia : '',
    desc_mat:
      current !== null && current.data.desc_mat ? current.data.desc_mat : '',
    desc_carrera:
      current !== null && current.data.desc_carrera
        ? current.data.desc_carrera
        : '',
    nro_legajo_p:
      current !== null && current.data.nro_legajo_p
        ? current.data.nro_legajo_p
        : '',
  };

  useEffect(() => {
    getProfesores();
  }, []);

  return (
    <Formik
      initialValues={_initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        values.nro_legajo_p = Number(values.nro_legajo_p);
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
          <FormControl
            disabled={current !== null}
            errors={
              errors.cod_materia && touched.cod_materia
                ? errors.cod_materia
                : null
            }
            label={'Codigo de Materia'}
            name={'cod_materia'}
            styles={current !== null && 'text-gray-300'}
          />

          <FormControl
            errors={
              errors.desc_mat && touched.desc_mat ? errors.desc_mat : null
            }
            label={'Descripción de materia'}
            name={'desc_mat'}
          />

          <FormControl
            errors={
              errors.desc_carrera && touched.desc_carrera
                ? errors.desc_carrera
                : null
            }
            label={'Descripción de carrera'}
            name={'desc_carrera'}
          />

          <SelectControl
            errors={
              errors.nro_legajo_p && touched.nro_legajo_p
                ? errors.nro_legajo_p
                : null
            }
            label={'Profesor'}
            name={'nro_legajo_p'}
            options={parseSelect(profesores, 'nro_legajo_p', 'ape_nomb')}
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

export default Materias;
