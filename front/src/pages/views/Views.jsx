import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  ClipboardDocumentCheckIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

import { Examenes, Materias, Person, Table } from '../../components';
import { useAppContext } from '../../context';
import { useModal, useNavigate } from '../../Hooks';
import { PartialRoutes } from '../../models';
import { Button, Toast } from '../../ui';

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
    materias: <Materias closeModal={closeModal} />,
    examenes: <Examenes closeModal={closeModal} />,
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
    if (view === PartialRoutes.TURNOS) {
    }

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

  useEffect(() => {
    if (state.toast.status !== null) {
      setTimeout(() => {
        actions.setToast({ message: null, status: null });
      }, 5000);
    }
  }, [state.toast]);

  return (
    <>
      {state.toast.status !== null && (
        <Toast
          icon={
            state.toast.status === 'ok' ? (
              <ClipboardDocumentCheckIcon className="w-[1.5rem]" />
            ) : (
              <ExclamationCircleIcon className="w-[1.5rem]" />
            )
          }
          styles={
            state.toast.status === 'ok'
              ? 'bg-green-100 border-l-green-400 text-green-700 text-sm'
              : 'bg-red-100 border-l-red-400 text-red-700 text-sm'
          }
          text={state.toast.message}
        />
      )}
      <Modal
        content={formHandler[view]}
        title={`${state.current === null ? 'Agregar' : 'Editar'} `}
      />
      <div className="flex flex-col">
        <h1 className="text-4xl font-semibold m-auto my-[4rem]">
          Listado de {title}
        </h1>
        {buttons?.create && (
          <Button
            bg={buttons.bg}
            bgHover={buttons.bgHover}
            styles={'mb-[4rem] m-auto'}
            text={buttons.create.text}
            onClick={() => openModal()}
          />
        )}
        <Table columns={table.columns} data={state.itemlist} />
      </div>
    </>
  );
};

export default Views;
