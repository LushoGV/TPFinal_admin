# TPFinal_admin

### API: http://localhost:3000/api
### Comando para arrancar el servidor (carpeta api): npm run dev

# Rutas
### Ruta Read:
* Metodo GET
* URL:  /doctypes = devuelve la tabla Tipo_doc <br /> /titles = devuelve la tabla Titulos <br /> /count_turnos = devuelve cantidad de inscriptos por turno <br /> /read/{table} = devuelve vistas 
* table = alumnos || profesores ||materias || examenes || turnos
	
 
### Ruta Create:
* Metodo POST
* URL: /create/{table}
* table = alumnos || profesores ||materias || examenes (EN CREATE/UPDATE/DELETE SON LAS MISMAS 4 OPCIONES)
* Los datos enviados en el body pueden tener cualquier orden (abarca las rutas create y update)
* Respetar los tipos de datos mandados en el body, strings y fechas entre ''. (abarca las rutas create y update)
* Formato de fecha 'año/mes/dia'


### Ruta Update:
* Metodo PUT 
* URL: /update/{table}/{primary key}
* {Primary Key} en alumnos = nro_legajo_a. Ej = 11
               en profesores = nro_legajo_p. Ej = 1
		     en materias = cod_materia. Ej = MA001
			en examenes (EN ESTE ORDEN y separados por &) = nro_legajo_a & cod_materia & cod_turno. EJ = /update/examenes/11&MA001&TN001


### Ruta Delete:
* Metodo DELETE
* URL: /delete/{table}/{primary key}
* {Primary Key} exactamente iguales q en la ruta Update



# Vistas 

### alumnos

```
CREATE VIEW [dbo].[View_alumnos]
AS
SELECT        dbo.Alumnos.nro_legajo_a, dbo.Alumnos.ape_nomb, dbo.Tipo_Doc.desc_doc, dbo.Alumnos.nro_doc, dbo.Alumnos.direccion, dbo.Alumnos.email, dbo.Alumnos.telefono, dbo.Alumnos.sexo, dbo.Alumnos.fec_nac, 
                         dbo.Alumnos.est_civil, dbo.Alumnos.cod_doc
FROM            dbo.Alumnos INNER JOIN
                         dbo.Tipo_Doc ON dbo.Alumnos.cod_doc = dbo.Tipo_Doc.cod_doc
GO
```



### profesores

```
CREATE VIEW [dbo].[View_profesores]
AS
SELECT        dbo.Profesores.nro_legajo_p, dbo.Profesores.ape_nomb, dbo.Tipo_Doc.desc_doc, dbo.Profesores.nro_doc, dbo.Profesores.direccion, dbo.Profesores.email, dbo.Profesores.telefono, dbo.Profesores.sexo, 
                         dbo.Profesores.fec_nac, dbo.Profesores.est_civil, dbo.TITULOS.DESC_TITULO, dbo.Tipo_Doc.cod_doc, dbo.Profesores.cod_titulo
FROM            dbo.Profesores INNER JOIN
                         dbo.Tipo_Doc ON dbo.Profesores.cod_doc = dbo.Tipo_Doc.cod_doc LEFT OUTER JOIN
                         dbo.TITULOS ON dbo.TITULOS.COD_TITULOS = dbo.Profesores.cod_titulo
GROUP BY dbo.Profesores.nro_legajo_p, dbo.Profesores.ape_nomb, dbo.Tipo_Doc.desc_doc, dbo.Profesores.nro_doc, dbo.Profesores.direccion, dbo.Profesores.email, dbo.Profesores.telefono, dbo.Profesores.sexo, 
                         dbo.Profesores.fec_nac, dbo.Profesores.est_civil, dbo.TITULOS.DESC_TITULO, dbo.Tipo_Doc.cod_doc, dbo.Profesores.cod_titulo
GO
```



### materias

```
CREATE VIEW [dbo].[View_materias]
AS
SELECT        dbo.Materias.desc_mat, dbo.Materias.desc_carrera, dbo.Profesores.ape_nomb, dbo.Profesores.nro_legajo_p, dbo.Materias.cod_materia, dbo.Profesores.nro_doc, dbo.Profesores.cod_doc, dbo.Profesores.direccion, 
                         dbo.Profesores.email, dbo.Profesores.telefono, dbo.Profesores.sexo, dbo.Profesores.fec_nac, dbo.Profesores.est_civil, dbo.Profesores.cod_titulo
FROM            dbo.Profesores INNER JOIN
                         dbo.Materias ON dbo.Profesores.nro_legajo_p = dbo.Materias.nro_legajo_p
GO
```



### examenes

```

CREATE VIEW [dbo].[View_examenes]
AS
SELECT        dbo.Materias.desc_mat, dbo.Turnos.desc_turno, dbo.Alumnos.ape_nomb, dbo.Examenes.año, dbo.Examenes.nota, dbo.Examenes.fecha_inscripcion, dbo.Examenes.cod_mat, dbo.Examenes.nro_legajo_a, 
                         dbo.Examenes.cod_turno
FROM            dbo.Examenes INNER JOIN
                         dbo.Alumnos ON dbo.Examenes.nro_legajo_a = dbo.Alumnos.nro_legajo_a INNER JOIN
                         dbo.Turnos ON dbo.Examenes.cod_turno = dbo.Turnos.cod_turno INNER JOIN
			 dbo.Materias ON dbo.Materias.cod_materia = dbo.Examenes.cod_mat
GO
  
 ```

 ### turnos
 
 ```
 CREATE VIEW [dbo].[View_turnos]
AS
SELECT        dbo.Turnos.desc_turno, dbo.Materias.desc_mat, dbo.Profesores.ape_nomb, dbo.PLANIFICACION.fecha_examen, dbo.Examenes.cod_mat, dbo.Examenes.nota
FROM            dbo.Materias INNER JOIN
                         dbo.Profesores ON dbo.Materias.nro_legajo_p = dbo.Profesores.nro_legajo_p INNER JOIN
                         dbo.Turnos INNER JOIN
                         dbo.Examenes ON dbo.Turnos.cod_turno = dbo.Examenes.cod_turno INNER JOIN
                         dbo.PLANIFICACION ON dbo.Turnos.cod_turno = dbo.PLANIFICACION.cod_turno ON dbo.Materias.cod_materia = dbo.Examenes.cod_mat AND dbo.Materias.cod_materia = dbo.PLANIFICACION.cod_mat
GO
 ```
 
