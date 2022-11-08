import { useState } from 'react';
import { createContext, useContext } from 'react';

import { normalizeText, parseTextRequest } from '../utilities';
import { api } from '../services';
import { PartialRoutes } from '../models';

const MyContext = createContext();

export const Provider = ({ children }) => {
  const [itemlist, setItemList] = useState([]);
  const [toast, setToast] = useState({ message: null, status: null });
  const [current, setCurrent] = useState(null);
  const [doctype, setDocType] = useState([]);
  const [titles, setTitles] = useState([]);

  const getItems = async (view) => {
    const { data, status } = await api.get(
      `${view !== PartialRoutes.COUNT_TURNOS ? `read/${view}` : `/${view}`}`
    );

    if (status !== 200) {
      setError(data);

      return;
    }

    setItemList(normalizeText(data.reverse()));
  };

  const createItem = async (view, item) => {
    const { data } = await api.post(
      `${
        view !== PartialRoutes.EXAMENES ? `create/${view}` : `${view}/create`
      }`,
      parseTextRequest(item)
    );

    console.log(data);

    if (data.status === 'ok') {
      setToast({ message: data.message, status: 'ok' });

      getItems(view);

      return;
    }
    setToast({ message: data.message, status: 'error' });
  };

  const updateItem = async (view, item) => {
    const { data } = await api.put(
      `${
        view !== PartialRoutes.EXAMENES ? `update/${view}` : `${view}/update`
      }`,
      parseTextRequest(item),
      current.id
    );

    console.log(data);

    if (data.status === 'ok') {
      setToast({ message: data.message, status: 'ok' });

      getItems(view);

      return;
    }
    setToast({ message: data.message, status: 'error' });
  };

  const handleDelete = async (view, id) => {
    const { data } = await api.delete(
      `${
        view !== PartialRoutes.EXAMENES ? `delete/${view}` : `/${view}/delete`
      }`,
      id
    );

    console.log(data);

    if (data.status === 'ok') {
      setToast({ message: data.message, status: 'ok' });

      setCurrent(null);
      getItems(view);

      return;
    }
    setToast({ message: data.message, status: 'error' });
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

  const state = { itemlist, current, doctype, titles, toast };
  const actions = {
    setToast,
    getItems,
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
