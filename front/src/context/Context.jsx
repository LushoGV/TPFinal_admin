import { useState } from 'react';
import { createContext, useContext } from 'react';

import { api } from '../services';

const MyContext = createContext();

export const Provider = ({ children }) => {
  const [itemlist, setItemList] = useState([]);
  const [error, setError] = useState(null);

  const getItems = async (view) => {
    const { data, status } = await api.get(view);

    if (status !== 'ok') {
      setError(data);

      return;
    }

    setItemList(data);
  };

  const state = { itemlist, error };
  const actions = { getItems };

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
