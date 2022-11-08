const queriesTables = [
  {
    title: 'Alumnos',
    description: `CREATE TABLE [dbo].[Alumnos](
        [nro_legajo_a] [int] NOT NULL,
        [ape_nomb] [nchar](30) NULL,
        [nro_doc] [int] NULL,
        [direccion] [nchar](50) NULL,
        [email] [nchar](20) NULL,
        [telefono] [nchar](20) NULL,
        [cod_doc] [nchar](5) NULL,
        [sexo] [nchar](1) NULL,
        [fec_nac] [datetime] NULL,
        [est_civil] [nchar](10) NULL,
    PRIMARY KEY CLUSTERED ([nro_legajo_a] ASC)
    WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO

    ALTER TABLE [dbo].[Alumnos]  WITH CHECK ADD  CONSTRAINT [FK_Alumnos_Tipo_Doc] FOREIGN KEY([cod_doc])
    REFERENCES [dbo].[Tipo_Doc] ([cod_doc])
    GO

    ALTER TABLE [dbo].[Alumnos] CHECK CONSTRAINT [FK_Alumnos_Tipo_Doc]
    GO`,
  },
  {
    title: 'Materias',
    description: `CREATE TABLE [dbo].[Materias](
        [cod_materia] [nchar](5) NOT NULL,
        [desc_mat] [nchar](30) NULL,
        [desc_carrera][nchar](30) NULL,
        [nro_legajo_p][int] NOT NULL,
        PRIMARY KEY CLUSTERED 
        (
        [cod_materia] ASC
        )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
        ) ON [PRIMARY]`,
  },
  {
    title: 'Profesores',
    description: `CREATE TABLE [dbo].[Profesores](
        [nro_legajo_p] [int] NOT NULL,
        [ape_nomb] [nchar](30) NULL,
        [nro_doc] [int] NULL,
        [cod_doc] [nchar](5) NULL,
        [direccion] [nchar](50) NULL,
        [email] [nchar](50) NULL,
        [telefono] [nchar](20) NULL,
        [sexo] [nchar](1) NULL,
        [fec_nac] [datetime] NULL,
        [est_civil] [nchar](10) NULL,
        [cod_titulo] [nchar](5) NULL,
        PRIMARY KEY CLUSTERED 
        (
        [nro_legajo_p] ASC
        )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
        ) ON [PRIMARY]`,
  },
  {
    title: 'Tipo Documento',
    description: `CREATE TABLE [dbo].[Tipo_Doc](
        [cod_doc] [nchar](5) NOT NULL,
        [desc_doc] [nchar](20) NULL,
        PRIMARY KEY CLUSTERED 
        (
        [cod_doc] ASC
        )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
        ) ON [PRIMARY]`,
  },
  {
    title: 'Turnos',
    description: `CREATE TABLE [dbo].[Turnos](
        [cod_turno] [nchar](5) NOT NULL,
        [desc_turno] [nchar](20) NULL,
        PRIMARY KEY CLUSTERED 
        (
        [cod_turno] ASC
        )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
        ) ON [PRIMARY]`,
  },
  {
    title: 'Examenes',
    description: `CREATE TABLE [dbo].[Examenes](
        [nro_legajo_a] [int] NOT NULL,
        [cod_mat] [nchar](5) NOT NULL,
        [cod_turno] [nchar](5) NOT NULL,
        [año] [nchar](4) NOT NULL,
        [nota] [int] NULL,
        [fecha_inscripcion] [datetime] NULL
        ) ON [PRIMARY]`,
  },
  {
    title: 'Planificacion',
    description: `CREATE TABLE [dbo].[PLANIFICACION](
        [cod_mat] [nchar](5) NOT NULL,
        [cod_turno] [nchar](5) NOT NULL,
        [año] [nchar](4) NOT NULL,
        [fecha_examen] [datetime] NULL)`,
  },
  {
    title: 'Titulos',
    description: `CREATE TABLE [dbo].[TITULOS](
        [COD_TITULO] [nchar](5) NULL,
        [DESC_TITULO] [nchar](50) NULL
        ) ON [PRIMARY]`,
  },
];

const queriesViews = [
  {
    title: 'Views_Alumnos',
    description: `CREATE VIEW [dbo].[View_alumnos] AS
    SELECT dbo.Alumnos.nro_legajo_a, dbo.Alumnos.ape_nomb, dbo.Tipo_Doc.desc_doc, dbo.Alumnos.nro_doc, dbo.Alumnos.direccion, dbo.Alumnos.email, dbo.Alumnos.telefono, dbo.Alumnos.sexo, dbo.Alumnos.fec_nac, dbo.Alumnos.est_civil, dbo.Alumnos.cod_doc
    FROM dbo.Alumnos
    INNER JOIN dbo.Tipo_Doc ON dbo.Alumnos.cod_doc = dbo.Tipo_Doc.cod_doc
    GO`,
  },
  {
    title: 'Views_Profesores',
    description: `CREATE VIEW [dbo].[View_profesores] AS
    SELECT dbo.Profesores.nro_legajo_p, dbo.Profesores.ape_nomb, dbo.Tipo_Doc.desc_doc, dbo.Profesores.nro_doc, dbo.Profesores.direccion, dbo.Profesores.email, dbo.Profesores.telefono, dbo.Profesores.sexo, dbo.Profesores.fec_nac, dbo.Profesores.est_civil, dbo.TITULOS.DESC_TITULO, dbo.Tipo_Doc.cod_doc, dbo.Profesores.cod_titulo
    FROM dbo.Profesores 
    INNER JOIN dbo.Tipo_Doc ON dbo.Profesores.cod_doc = dbo.Tipo_Doc.cod_doc 
    LEFT OUTER JOIN dbo.TITULOS ON dbo.TITULOS.COD_TITULOS = dbo.Profesores.cod_titulo
    GROUP BY dbo.Profesores.nro_legajo_p, dbo.Profesores.ape_nomb, dbo.Tipo_Doc.desc_doc, dbo.Profesores.nro_doc, dbo.Profesores.direccion, dbo.Profesores.email, dbo.Profesores.telefono, dbo.Profesores.sexo, dbo.Profesores.fec_nac, dbo.Profesores.est_civil, dbo.TITULOS.DESC_TITULO, dbo.Tipo_Doc.cod_doc, dbo.Profesores.cod_titulo
    GO`,
  },
  {
    title: 'Views_Materias',
    description: `CREATE VIEW [dbo].[View_materias] AS
    SELECT dbo.Materias.desc_mat, dbo.Materias.desc_carrera, dbo.Profesores.ape_nomb, dbo.Profesores.nro_legajo_p, dbo.Materias.cod_materia, dbo.Profesores.nro_doc, dbo.Profesores.cod_doc, dbo.Profesores.direccion, dbo.Profesores.email, dbo.Profesores.telefono, dbo.Profesores.sexo, dbo.Profesores.fec_nac, dbo.Profesores.est_civil, dbo.Profesores.cod_titulo
    FROM dbo.Profesores 
    INNER JOIN dbo.Materias ON dbo.Profesores.nro_legajo_p = dbo.Materias.nro_legajo_p
    GO`,
  },
  ,
  {
    title: 'Views_Examenes',
    description: `CREATE VIEW [dbo].[View_examenes] AS
    SELECT dbo.Materias.desc_mat, dbo.Turnos.desc_turno, dbo.Alumnos.ape_nomb, dbo.Examenes.año, dbo.Examenes.nota, dbo.Examenes.fecha_inscripcion, dbo.Examenes.cod_mat, dbo.Examenes.nro_legajo_a, dbo.Examenes.cod_turno
    FROM dbo.Examenes 
    INNER JOIN dbo.Alumnos ON dbo.Examenes.nro_legajo_a = dbo.Alumnos.nro_legajo_a 
    INNER JOIN dbo.Turnos ON dbo.Examenes.cod_turno = dbo.Turnos.cod_turno 
    INNER JOIN dbo.Materias ON dbo.Materias.cod_materia = dbo.Examenes.cod_mat
    GO`,
  },
  {
    title: 'Views_Turnos',
    description: `CREATE VIEW [dbo].[View_turnos] AS
    SELECT dbo.Turnos.desc_turno, dbo.Materias.desc_mat, dbo.Profesores.ape_nomb, dbo.PLANIFICACION.fecha_examen, dbo.Examenes.cod_mat, dbo.Examenes.nota
    FROM dbo.Materias 
    INNER JOIN dbo.Profesores ON dbo.Materias.nro_legajo_p = dbo.Profesores.nro_legajo_p 
    INNER JOIN dbo.Turnos 
    INNER JOIN dbo.Examenes ON dbo.Turnos.cod_turno = dbo.Examenes.cod_turno 
    INNER JOIN dbo.PLANIFICACION ON dbo.Turnos.cod_turno = dbo.PLANIFICACION.cod_turno ON dbo.Materias.cod_materia = dbo.Examenes.cod_mat AND dbo.Materias.cod_materia = dbo.PLANIFICACION.cod_mat
    GO`,
  },
];

export { queriesTables, queriesViews };
