import { Field } from 'formik';

import { Alert } from '../../components';

const FormControl = ({
  name,
  label,
  ringcolor,
  styles,
  errors,
  placeholder,
  ...rest
}) => (
  <>
    <div className="mb-4">
      <label className="text-gray-600 text-md font-semibold" htmlFor={name}>
        {label}
      </label>
      <Field
        autoComplete="off"
        className={`w-full mt-2 block p-3 bg-gray-100 border rounded-md 
          outline-none text-gray-600 ${styles} focus:ring-2
          ${errors !== null ? 'ring-yellow-400 ring-2' : ringcolor}`}
        id={name}
        name={name}
        placeholder={placeholder}
        {...rest}
      />
    </div>
    {errors !== null && <Alert text={errors} />}
  </>
);

export default FormControl;
