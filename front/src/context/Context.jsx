import { useState } from 'react';
import { createContext, useContext } from 'react';

import { api } from '../services';

const MyContext = createContext();

export const Provider = ({ children }) => {
  const [itemlist, setItemList] = useState([]);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState({});

  const getItems = async (view) => {
    const { data, status } = await api.get(`read/${view}`);

    if (status !== 200) {
      setError(data);

      return;
    }

    setItemList(data);
  };

  const state = { itemlist, error, current };
  const actions = { getItems, setError, setCurrent };

  return (
    <MyContext.Provider value={{ state, actions }}>
      {children}
    </MyContext.Provider>
  );
};

export const useAppContext = () => {
  const { state, actions } = useContext(MyContext);

  return { state, actions };
};
