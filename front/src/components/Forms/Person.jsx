import { Formik, Form as FormikForm } from 'formik';

import validationSchema from './ValidationSchema';

const valuesForm = {};

const Person = () => {
  return (
    <Formik initialValues={valuesForm} validationSchema={validationSchema}>
      {({ errors, touched }) => {}}
    </Formik>
  );
};

export default Person;
