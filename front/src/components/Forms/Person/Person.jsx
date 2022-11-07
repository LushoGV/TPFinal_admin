import { Formik, Form as FormikForm } from 'formik';
import { useParams } from 'react-router-dom';

import { parseSelect } from '../../../adapters';
import { parseDate } from '../../../utilities';
import { useAppContext } from '../../../context';
import { Button, FormControl, SelectControl } from '../../../ui';

import {
  validationSchema_alumno,
  validationSchema_profesor,
} from './ValidationSchema';

// Mode = true (Alumno) || Mode = false (Profesor)
const Person = ({ mode, closeModal }) => {
  const { view } = useParams();
  const {
    state: { current, doctype, titles },
    actions,
  } = useAppContext();

  const _initialValues = {
    ape_nomb:
      current !== null && current.data.ape_nomb ? current.data.ape_nomb : '',
    nro_doc:
      current !== null && current.data.nro_doc ? current.data.nro_doc : '',
    direccion:
      current !== null && current.data.direccion ? current.data.direccion : '',
    email: current !== null && current.data.email ? current.data.email : '',
    cod_doc:
      current !== null && current.data.cod_doc ? current.data.cod_doc : '',
    sexo: current !== null && current.data.sexo ? current.data.sexo : '',
    fec_nac:
      current !== null && current.data.fec_nac
        ? parseDate(current.data.fec_nac)
        : '',
    est_civil:
      current !== null && current.data.est_civil ? current.data.est_civil : '',
    telefono:
      current !== null && current.data.telefono ? current.data.telefono : '',
  };

  const _initialValuesAlumno = {
    ..._initialValues,
    nro_legajo_a: current !== null ? current.data.nro_legajo_a : '',
  };

  const _initialValuesProfesor = {
    ..._initialValues,
    nro_legajo_p: current !== null ? current.data.nro_legajo_p : '',
    cod_titulo:
      current !== null
        ? current.data.cod_titulo && current.data.cod_titulo
        : '',
  };

  return (
    <Formik
      initialValues={mode ? _initialValuesAlumno : _initialValuesProfesor}
      validationSchema={
        mode ? validationSchema_alumno : validationSchema_profesor
      }
      onSubmit={(values) => {
        if (values.nro_doc !== '') {
          values.nro_doc = Number(values.nro_doc);
        }
        if (mode) {
          values.nro_legajo_a = Number(values.nro_legajo_a);
        } else {
          values.nro_legajo_p = Number(values.nro_legajo_p);
        }

        if (current !== null) {
          actions.updateItem(view, values);
        } else {
          actions.createItem(view, values);
        }

        closeModal();
      }}
    >
      {({ errors, touched }) => (
        <FormikForm className="flex flex-col">
          {mode ? (
            <FormControl
              errors={
                errors.nro_legajo_a && touched.nro_legajo_a
                  ? errors.nro_legajo_a
                  : null
              }
              label={'Nro. de legajo'}
              name={'nro_legajo_a'}
            />
          ) : (
            <FormControl
              errors={
                errors.nro_legajo_p && touched.nro_legajo_p
                  ? errors.nro_legajo_p
                  : null
              }
              label={'Nro. de legajo'}
              name={'nro_legajo_p'}
            />
          )}
          <FormControl
            errors={
              errors.ape_nomb && touched.ape_nomb ? errors.ape_nomb : null
            }
            label={'Apellido y Nombre'}
            name={'ape_nomb'}
          />
          <SelectControl
            errors={errors.cod_doc && touched.cod_doc ? errors.cod_doc : null}
            label={'Tipo de Documento'}
            name={'cod_doc'}
            options={parseSelect(doctype, 'cod_doc', 'desc_doc')}
          />
          <FormControl
            errors={errors.nro_doc && touched.nro_doc ? errors.nro_doc : null}
            label={'Numero de Documento'}
            name={'nro_doc'}
          />
          <FormControl
            errors={
              errors.telefono && touched.telefono ? errors.telefono : null
            }
            label={'Telefono'}
            name={'telefono'}
          />
          <FormControl
            errors={
              errors.direccion && touched.direccion ? errors.direccion : null
            }
            label={'Dirección'}
            name={'direccion'}
          />
          <FormControl
            errors={errors.email && touched.email ? errors.email : null}
            label={'Email'}
            name={'email'}
            type={'email'}
          />
          <FormControl
            errors={errors.fec_nac && touched.fec_nac ? errors.fec_nac : null}
            label={'Fecha de Nacimiento'}
            name={'fec_nac'}
            type={'date'}
          />
          <SelectControl
            errors={
              errors.est_civil && touched.est_civil ? errors.est_civil : null
            }
            label={'Sexo'}
            name={'sexo'}
            options={[
              { name: 'Masculino', id: 'M' },
              { name: 'Femenino', id: 'F' },
            ]}
          />
          <SelectControl
            errors={
              errors.est_civil && touched.est_civil ? errors.est_civil : null
            }
            label={'Estado Civil'}
            name={'est_civil'}
            options={[
              { name: 'SOLTERO', id: 'SOLTERO' },
              { name: 'CASADO', id: 'CASADO' },
            ]}
          />
          {!mode && (
            <SelectControl
              errors={
                errors.cod_titulo && touched.cod_titulo
                  ? errors.cod_titulo
                  : null
              }
              label={'Titulo'}
              name={'cod_titulo'}
              options={parseSelect(titles, 'cod_titulo', 'desc_titulo')}
            />
          )}
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

export default Person;
