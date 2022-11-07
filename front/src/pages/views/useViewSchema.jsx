import { useAppContext } from '../../context';
import { PartialRoutes, Routes } from '../../models';
import { Button } from '../../ui';

// Contiene la data correspondiente para cada view
const useViewSchema = () => {
  const { actions } = useAppContext();

  const schemas = [
    {
      route: PartialRoutes.ALUMNOS,
      title: 'Alumnos',
      buttons: {
        create: {
          url: `${Routes.VIEWS}/${PartialRoutes.ALUMNOS}/create`,
          text: 'Crear nuevo Alumno',
        },
        edit: {
          url: `${Routes.VIEWS}/${PartialRoutes.ALUMNOS}/edit`,
          text: 'Editar Alumno',
        },
        bg: 'bg-emerald-500',
        bgHover: 'hover:bg-emerald-600',
      },
      table: {
        columns: [
          { Header: 'Nro. Legajo', accessor: 'nro_legajo_a' },
          { Header: 'Nombre y Apellido', accessor: 'ape_nomb' },
          { Header: 'Nro. Documento', accessor: 'nro_doc' },
          {
            Header: ' ',
            accessor: ' ',
            Cell: (props) => {
              const dataRow = props.row.original;

              return (
                <>
                  <Button
                    bg={'bg-red-500'}
                    bgHover={'hover:bg-red-600'}
                    styles={'mr-[18px]'}
                    text={'Borrar'}
                    onClick={() => {
                      actions.handleDelete(dataRow.nro_legajo_a);
                    }}
                  />
                  <Button
                    bg={'bg-emerald-500'}
                    bgHover={'hover:bg-emerald-600'}
                    styles={'mr-[18px]'}
                    text={'Editar'}
                    onClick={() => {
                      actions.setCurrent({
                        id: dataRow.nro_legajo_a,
                        data: dataRow,
                      });
                    }}
                  />
                </>
              );
            },
          },
        ],
      },
    },
    {
      route: PartialRoutes.PROFESORES,
      title: 'Profesores',
      buttons: {
        create: {
          url: `${Routes.VIEWS}/${PartialRoutes.PROFESORES}/create`,
          text: 'Crear nuevo Profesor',
        },
        edit: {
          url: `${Routes.VIEWS}/${PartialRoutes.PROFESORES}/edit`,
          text: 'Editar Profesor',
        },
        bg: 'bg-violet-500',
        bgHover: 'hover:bg-violet-600',
      },
      table: {
        columns: [
          { Header: 'Nro. Legajo', accessor: 'nro_legajo_p' },
          { Header: 'Nombre y Apellido', accessor: 'ape_nomb' },
        ],
      },
    },
    {
      route: PartialRoutes.MATERIAS,
      title: 'Materias',
      buttons: {
        create: {
          url: `${Routes.VIEWS}/${PartialRoutes.MATERIAS}/create`,
          text: 'Crear nueva Materia',
        },
        edit: {
          url: `${Routes.VIEWS}/${PartialRoutes.MATERIAS}/edit`,
          text: 'Editar Materia',
        },
        bg: 'bg-orange-500',
        bgHover: 'hover:bg-orange-600',
      },
      table: {
        columns: [
          { Header: 'Materia', accessor: 'desc_mat' },
          { Header: 'Carrera', accessor: 'desc_carrera' },
        ],
      },
    },
    {
      route: PartialRoutes.EXAMENES,
      title: 'Examenes',
      buttons: {
        create: {
          url: `${Routes.VIEWS}/${PartialRoutes.EXAMENES}/create`,
          text: 'Crear nuevo Examen',
        },
        edit: {
          url: `${Routes.VIEWS}/${PartialRoutes.EXAMENES}/edit`,
          text: 'Editar Examen',
        },
        bg: 'bg-pink-500',
        bgHover: 'hover:bg-pink-600',
      },
      table: {
        columns: [
          { Header: 'Codigo de Materia', accessor: 'cod_mat' },
          { Header: 'Turno', accessor: 'cod_turno' },
        ],
      },
    },
  ];

  return { schemas };
};

export default useViewSchema;
