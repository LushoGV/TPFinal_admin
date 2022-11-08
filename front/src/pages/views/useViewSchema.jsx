import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from '../../context';
import { PartialRoutes } from '../../models';
import { api } from '../../services';
import { Button } from '../../ui';
import { normalizeText, parseDate } from '../../utilities';

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
          { Header: 'Titulo', accessor: 'DESC_TITULO' },
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
                        `legajo=${dataRow.nro_legajo_a}&materia=${
                          dataRow.cod_mat
                        }&turno=${dataRow.cod_turno}&fecha=${dayjs(
                          dataRow.fecha_examen
                        ).format('YYYY-MM-DD')}`
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
                        id: `legajo=${dataRow.nro_legajo_a}&materia=${
                          dataRow.cod_mat
                        }&turno=${dataRow.cod_turno}&fecha=${dayjs(
                          dataRow.fecha_examen
                        ).format('YYYY-MM-DD')}`,
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
      route: PartialRoutes.TURNOS,
      title: 'Materia por Turno',
      table: {
        columns: [
          { Header: 'Turno', accessor: 'desc_turno' },
          { Header: 'Materia', accessor: 'desc_mat' },
          { Header: 'Profesor', accessor: 'ape_nomb' },
          {
            Header: 'Fecha Examen',
            accessor: 'fecha_examen',
            Cell: (props) => {
              const data = props.row.original;

              if (data?.fecha_examen) {
                return parseDate(data?.fecha_examen);
              }
            },
          },
        ],
      },
    },
    {
      route: PartialRoutes.COUNT_TURNOS,
      title: 'Turnos',
      table: {
        columns: [
          { Header: 'Turno', accessor: 'desc_turno' },
          { Header: 'Cantidad de Inscriptos', accessor: 'Cantidad' },
          {
            Header: 'Porcentaje aprobados',
            accessor: ' ',
            Cell: (props) => {
              const [number, setNumber] = useState(null);

              (async () => {
                const { data, status } = await api.get('read/turnos');

                if (status !== 200) {
                  return;
                }

                const a = props.row.original;

                const filt = normalizeText(data).filter(
                  (turno) =>
                    turno.desc_turno === a.desc_turno && turno.nota >= 7
                ).length;

                setNumber(Math.round((filt / a.Cantidad) * 100));
              })();

              return !isNaN(number) ? <span>{number}%</span> : <span>0%</span>;
            },
          },
        ],
      },
    },
  ];

  return { schemas };
};

export default useViewSchema;
