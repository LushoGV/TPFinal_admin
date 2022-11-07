import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Examenes, Materias, Person, Table } from '../../components';
import { useAppContext } from '../../context';
import { useModal, useNavigate } from '../../Hooks';
import { PartialRoutes } from '../../models';
import { Button } from '../../ui';

import useViewSchema from './useViewSchema';

const Views = () => {
  const { state, actions } = useAppContext();
  const { view } = useParams();
  const { go } = useNavigate();
  const { schemas } = useViewSchema();
  const [Modal, openModal, closeModal] = useModal();

  const formHandler = {
    alumnos: <Person closeModal={closeModal} mode={true} />,
    profesores: <Person closeModal={closeModal} mode={false} />,
    materias: <Materias />,
    examenes: <Examenes />,
  };

  // Verifica que el parametro de la url exista, en ese caso hace
  // el get de datos basandose en el parametro 'view'.
  useEffect(() => {
    if (Object.values(PartialRoutes).includes(view)) {
      actions.getItems(view);
    } else {
      go('/');
    }
  }, [view]);

  // Trae el esquema que le corresponde a cada vista.
  const { title, buttons, table } = useMemo(() => {
    return schemas.filter((schema) => schema.route === view)[0];
  }, [view]);

  useEffect(() => {
    if (state.current !== null) {
      return openModal();
    }
  }, [state.current]);

  useEffect(() => {
    actions.getDocTypes();
    actions.getTitles();
  }, []);

  return (
    <>
      <Modal
        content={formHandler[view]}
        title={`${state.current === null ? 'Agregar' : 'Editar'} `}
      />
      <div className="flex flex-col">
        <h1 className="text-4xl font-semibold m-auto my-[4rem]">
          Listado de {title}
        </h1>
        <Button
          bg={buttons.bg}
          bgHover={buttons.bgHover}
          styles={'mb-[4rem] m-auto'}
          text={buttons.create.text}
          onClick={() => openModal()}
        />
        <Table columns={table.columns} data={state.itemlist} />
      </div>
    </>
  );
};

export default Views;
