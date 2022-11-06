import { PartialRoutes, Routes } from '../../models';

// Contiene la data correspondiente para cada view
const ViewSchema = [
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

export default ViewSchema;
