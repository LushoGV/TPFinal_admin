import { useEffect } from 'react';

import { useModal } from '../../Hooks';
import { Person } from '../../components';
// import { AppUseContext } from '../../context'; // descomentar

const Alumnos = () => {
  const [Modal, openModal] = useModal();
  // const { actions } = AppUseContext(); // descomentar

  const handleCreate = () => {
    openModal();
  };

  useEffect(() => {
    // actions.getAlumnos(); // Pegar a la api (descomentar)
  }, []);

  return (
    <>
      <div>
        <Modal content={<Person />} title={'Agregar Alumno'} />
      </div>
      <div>
        <h2 className="text-4xl font-semibold py-6">Alumnos</h2>
        <button
          className="px-[1rem] py-[0.5rem] bg-yellow-200 mb-3"
          onClick={() => handleCreate()}
        >
          Agregar Alumno
        </button>
        <div className="bg-yellow-200">tabla alumnos</div>
      </div>
    </>
  );
};

export default Alumnos;
