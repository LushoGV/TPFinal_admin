import { Field } from 'formik';

import { Alert } from '../../components';

const SelectControl = ({
  name,
  label,
  ringcolor,
  styles,
  options,
  errors,
  ...rest
}) => (
  <div className="mb-4 flex flex-col">
    <label className="text-gray-600 text-md font-semibold block" htmlFor={name}>
      {label}
    </label>
    <Field
      as={'select'}
      className={`w-full  block p-1 bg-gray-100 border rounded-md 
          outline-none text-gray-600 ${styles} focus:ring-2 ring-${ringcolor}
          ${
            errors !== null
              ? 'ring-yellow-400 ring-2 my-2'
              : 'ring-blue-500 mt-2'
          }`}
      id={name}
      name={name}
      {...rest}
    >
      <option value={''}>----</option>
      {options.map((option) => (
        <option key={option.nombre} value={option.id}>
          {option.nombre}
        </option>
      ))}
    </Field>
    {errors !== null && <Alert text={errors} />}
  </div>
);

export default SelectControl;
