import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { normalizeText } from '../../adapters';
import { useAppContext } from '../../context';
import { useNavigate } from '../../Hooks';
import { PartialRoutes, Routes } from '../../models';

import ViewSchema from './ViewSchema';

const Views = () => {
  const [parsedtext, setParsedText] = useState([]);
  const { state, actions } = useAppContext();
  const { view } = useParams();
  const { go } = useNavigate();

  // Verifica que el parametro de la url exista, en ese caso hace
  // el get de datos basandose en el parametro 'view'
  useEffect(() => {
    if (Object.values(PartialRoutes).includes(view)) {
      actions.getItems(view);
    } else {
      go(`/${Routes.HOME}`);
    }
  }, [view]);

  // Cuando se hace un get de datos se activa este useEffect
  // utiliza un adapter para normalizar el texto.
  useEffect(() => {
    const normalize = normalizeText(state.itemlist);

    setParsedText(normalize);
  }, [state.itemlist]);

  // Trae el esquema que le corresponde a cada vista
  const { title, buttons, table } = useMemo(() => {
    return ViewSchema.filter((schema) => schema.route === view)[0];
  }, [view]);

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold m-auto my-[4rem]">
        Listado de {title}
      </h1>
      <button
        className={`${buttons.bg} ${buttons.bgHover} max-w-[12rem] p-2 px-4 text-gray-100 rounded-lg transition-all 
          shadow-md m-auto`}
      >
        {buttons.create.text}
      </button>
    </div>
  );
};

export default Views;
