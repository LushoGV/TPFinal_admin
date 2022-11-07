import { useParams } from 'react-router-dom';

import { useAppContext } from '../../context';
import { PartialRoutes } from '../../models';
import { Button } from '../../ui';

// Contiene la data correspondiente para cada view
const useViewSchema = () => {
  const { actions } = useAppContext();
  const { view } = useParams();

  const schemas = [
    {
      route: PartialRoutes.ALUMNOS,
      title: 'Alumnos',
      buttons: {
        create: {
          text: 'Crear nuevo Alumno',
        },
        edit: {
          text: 'Editar Alumno',
        },
        bg: 'bg-emerald-500',
        bgHover: 'hover:bg-emerald-600',
      },
      table: {
        columns: [
          { Header: 'Nombre y Apellido', accessor: 'ape_nomb' },
          { Header: 'Nro. Documento', accessor: 'nro_doc' },
          { Header: 'Email', accessor: 'email' },
          { Header: 'Telefono', accessor: 'telefono' },
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
                      actions.handleDelete(view, dataRow.nro_legajo_a);
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
          text: 'Crear nuevo Profesor',
        },
        edit: {
          text: 'Editar Profesor',
        },
        bg: 'bg-violet-500',
        bgHover: 'hover:bg-violet-600',
      },
      table: {
        columns: [
          { Header: 'Nombre y Apellido', accessor: 'ape_nomb' },
          { Header: 'Nro. Documento', accessor: 'nro_doc' },
          { Header: 'Email', accessor: 'email' },
          { Header: 'Titulo', accessor: 'desc_titulo' },
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
                      actions.handleDelete(view, dataRow.nro_legajo_p);
                    }}
                  />
                  <Button
                    bg={'bg-violet-500'}
                    bgHover={'hover:bg-violet-600'}
                    styles={'mr-[18px]'}
                    text={'Editar'}
                    onClick={() => {
                      actions.setCurrent({
                        id: dataRow.nro_legajo_p,
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
      route: PartialRoutes.MATERIAS,
      title: 'Materias',
      buttons: {
        create: {
          text: 'Crear nueva Materia',
        },
        edit: {
          text: 'Editar Materia',
        },
        bg: 'bg-orange-500',
        bgHover: 'hover:bg-orange-600',
      },
      table: {
        columns: [
          { Header: 'Profesor', accessor: 'ape_nomb' },
          { Header: 'Email Prof.', accessor: 'email' },
          { Header: 'Carrera', accessor: 'desc_carrera' },
          { Header: 'Materia', accessor: 'desc_mat' },
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
                      actions.handleDelete(view, dataRow.cod_materia);
                    }}
                  />
                  <Button
                    bg={'bg-orange-500'}
                    bgHover={'hover:bg-orange-600'}
                    styles={'mr-[18px]'}
                    text={'Editar'}
                    onClick={() => {
                      actions.setCurrent({
                        id: dataRow.cod_materia,
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
      route: PartialRoutes.EXAMENES,
      title: 'Examenes',
      buttons: {
        create: {
          text: 'Crear nuevo Examen',
        },
        edit: {
          text: 'Editar Examen',
        },
        bg: 'bg-pink-500',
        bgHover: 'hover:bg-pink-600',
      },
      table: {
        columns: [
          { Header: 'Materia', accessor: 'desc_mat' },
          { Header: 'Turno', accessor: 'desc_turno' },
          { Header: 'Alumno', accessor: 'ape_nomb' },
          { Header: 'Año', accessor: 'año' },
          { Header: 'Nota', accessor: 'nota' },
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
                      actions.handleDelete(
                        view,
                        `${dataRow.nro_legajo_a}&${dataRow.cod_materia}&${dataRow.cod_turno}`
                      );
                    }}
                  />
                  <Button
                    bg={'bg-pink-500'}
                    bgHover={'hover:bg-pink-600'}
                    styles={'mr-[18px]'}
                    text={'Editar'}
                    onClick={() => {
                      actions.setCurrent({
                        id: `${dataRow.nro_legajo_a}&${dataRow.cod_materia}&${dataRow.cod_turno}`,
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
  ];

  return { schemas };
};

export default useViewSchema;
