import { PartialRoutes, Routes } from '../../models';

const ViewSchema = [
  {
    route: PartialRoutes.ALUMNOS,
    title: 'Alumnos',
    create: `${Routes.VIEWS}/${PartialRoutes.ALUMNOS}/create`,
    editCurrent: `${Routes.VIEWS}/${PartialRoutes.ALUMNOS}/edit`,
    table: {
      columns: [
        { Header: 'Nro. Legajo', accessor: 'nro_legajo_a' },
        { Header: 'Nombre y Apellido', accessor: 'ape_nomb' },
      ],
    },
  },
  {
    route: PartialRoutes.PROFESORES,
    title: 'Profesores',
    create: `${Routes.VIEWS}/${PartialRoutes.PROFESORES}/create`,
    editCurrent: `${Routes.VIEWS}/${PartialRoutes.PROFESORES}/edit`,
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
    create: `${Routes.VIEWS}/${PartialRoutes.MATERIAS}/create`,
    editCurrent: `${Routes.VIEWS}/${PartialRoutes.MATERIAS}/edit`,
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
    create: `${Routes.VIEWS}/${PartialRoutes.EXAMENES}/create`,
    editCurrent: `${Routes.VIEWS}/${PartialRoutes.EXAMENES}/edit`,
    table: {
      columns: [
        { Header: 'Codigo de Materia', accessor: 'cod_mat' },
        { Header: 'Turno', accessor: 'cod_turno' },
      ],
    },
  },
];

export default ViewSchema;
