import { useState } from 'react';
import { createContext, useContext } from 'react';

import { normalizeText, parseTextRequest } from '../utilities';
import { api } from '../services';

const MyContext = createContext();

export const Provider = ({ children }) => {
  const [itemlist, setItemList] = useState([]);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [current, setCurrent] = useState(null);
  const [doctype, setDocType] = useState([]);
  const [titles, setTitles] = useState([]);

  const getItems = async (view) => {
    const { data, status } = await api.get(`read/${view}`);

    if (status !== 200) {
      setError(data);

      return;
    }

    setItemList(normalizeText(data.reverse()));
  };

  const createItem = async (view, item) => {
    const { data } = await api.post(`create/${view}`, parseTextRequest(item));

    console.log(data);

    if (data.status === 'ok') {
      setToast({ message: data.message });

      getItems(view);

      return;
    }
    setError({ message: data.message });
  };

  const updateItem = async (view, item) => {
    const { data } = await api.put(
      `update/${view}`,
      parseTextRequest(item),
      current.id
    );

    console.log(data);

    if (data.status === 'ok') {
      setToast({ message: data.message });

      getItems(view);

      return;
    }
    setError({ message: data.message });
  };

  const handleDelete = async (view, id) => {
    const { data } = await api.delete(`delete/${view}`, id);

    console.log(data);

    if (data.status === 'ok') {
      setToast({ message: data.message });

      setCurrent(null);
      getItems(view);

      return;
    }
    setError({ message: data.message });
  };

  const getDocTypes = async () => {
    const { data, status } = await api.get(`doctypes`);

    if (status === 200) {
      setDocType(normalizeText(data));

      return;
    }
  };

  const getTitles = async () => {
    const { data, status } = await api.get(`titles`);

    if (status === 200) {
      setTitles(normalizeText(data));

      return;
    }
  };

  const state = { itemlist, error, current, doctype, titles, toast };
  const actions = {
    setToast,
    getItems,
    setError,
    setCurrent,
    handleDelete,
    setItemList,
    getDocTypes,
    getTitles,
    createItem,
    updateItem,
  };

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
