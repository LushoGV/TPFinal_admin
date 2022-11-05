import { useState } from 'react';
import { createContext, useContext } from 'react';

import { api } from '../services';

const MyContext = createContext();

export const Provider = ({ children }) => {
  const [alumnos, setAlumnos] = useState([]);
  const [error, setError] = useState(null);

  const getAlumnos = async () => {
    const call = await api.get('alumnos');

    console.log(call.data);

    if (call.data !== 'ok') {
      setError(call.data);

      return;
    }

    setAlumnos(call.data);
  };

  const state = { alumnos, error };
  const actions = { getAlumnos };

  return (
    <MyContext.Provider value={{ state, actions }}>
      {children}
    </MyContext.Provider>
  );
};

export const AppUseContext = () => {
  const { state, actions } = useContext(MyContext);

  return { state, actions };
};
