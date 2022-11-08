import { Router } from "express";
import { connectDb } from "../database.js";
import getErrorMessage from "../helpers/errorHandling.js";

const router = Router();

router.post("/examenes/create", async (req, res) => {
  const bool = await connectDb();

  const [dataExamenes, dataPlanificacion] = createBodyQuery(req.body)

  const queryStringExamenes = createQueryString("Examenes", dataExamenes, "insert");
  const queryStringPlanificacion = createQueryString(
    "Planificacion",
    dataPlanificacion,
    "insert"
  );

  try {
    const result = await bool.query(
      `${queryStringExamenes}; ${queryStringPlanificacion};`
    );
    console.log(result);
    return res
      .status(200)
      .json({ status: "ok", message: "Creado correctamente." });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      status: "error",
      message: getErrorMessage(error.originalError.info.number),
    });
  }
});

router.put("/examenes/update/legajo=:legajo&materia=:materia&turno=:turno&fecha=:fecha", async (req, res) => {
    const bool = await connectDb();
    const [dataExamenes, dataPlanificacion] = createBodyQuery(req.body)
    
    const queryStringExamenes = createQueryString("Examenes", dataExamenes, "update", req.params);
    const queryStringPlanificacion = createQueryString(
      "Planificacion",
      dataPlanificacion,
      "update",
      req.params
    );

    try {
        const result = await bool.query(
          `${queryStringPlanificacion}; ${queryStringExamenes};`
        );
        
        return res
          .status(200)
          .json({ status: "ok", message: "Actualizado correctamente." });
      } catch (error) {
        console.log(error);
    
        return res.status(400).json({
          status: "error",
          message: getErrorMessage(error.originalError.info.number),
        });
      }
})

router.delete("/examenes/delete/legajo=:legajo&materia=:materia&turno=:turno&fecha=:fecha", async (req,res) =>{
    const bool = await connectDb();
    const [dataExamenes, dataPlanificacion] = createBodyQuery(req.body)
    
    const queryStringExamenes = createQueryString("Examenes", dataExamenes, "delete", req.params);
    const queryStringPlanificacion = createQueryString(
      "Planificacion",
      dataPlanificacion,
      "delete",
      req.params
    );

    try {
        const result = await bool.query(
          `${queryStringExamenes}; ${queryStringPlanificacion};`
        );
        
        return res
          .status(200)
          .json({ status: "ok", message: "Eliminado correctamente." });
      } catch (error) {
        console.log(error);
    
        return res.status(400).json({
          status: "error",
          message: getErrorMessage(error.originalError.info.number),
        });
      }
})


const createQueryString = (table, body, operacion, params) => {

    let strQuery


    switch (operacion) {
        case "insert":
            strQuery= `INSERT INTO ${table} (`;

            body.map((element) => {
              strQuery += `${element[0]},`;
            });
          
            strQuery = strQuery.slice(0, -1);
            strQuery += ") values (";
          
            body.map((element, index) => {
              strQuery += `${element[1]},`;
            });
          
        strQuery = strQuery.slice(0, -1);
        strQuery += ")";
          
        return strQuery;
        

        case "update":
            strQuery = `UPDATE ${table} SET`;

            body.map((element) => {
            strQuery += ` ${element[0]} = ${element[1]},`;
            });

            strQuery = strQuery.slice(0, -1);

            if(table === 'Examenes') strQuery += ` WHERE  nro_legajo_a = ${params.legajo} AND cod_mat = '${params.materia}' AND cod_turno = '${params.turno}'`;
            else strQuery += ` WHERE  fecha_examen = '${params.fecha}' AND cod_mat = '${params.materia}' AND cod_turno = '${params.turno}'`;
        
            return strQuery;


        case "delete":  
            strQuery = `DELETE FROM ${table}`;
            if(table === 'Examenes') strQuery += ` WHERE  nro_legajo_a = ${params.legajo} AND cod_mat = '${params.materia}' AND cod_turno = '${params.turno}'`;
            else strQuery += ` WHERE  fecha_examen = '${params.fecha}' AND cod_mat = '${params.materia}' AND cod_turno = '${params.turno}'`;
            return strQuery;
    
        default:
        break;
    }

};

const createBodyQuery = (body) => {

    let bodyArray = Object.entries(body);

    let dataExamenes = bodyArray.filter(
      (element) => element[0] !== "fecha_examen"
    );
    let dataPlanificacion = bodyArray.filter(
      (element) =>
        element[0] === "cod_mat" ||
        element[0] === "cod_turno" ||
        element[0] === "año" ||
        element[0] === "fecha_examen"
    );

    return [dataExamenes, dataPlanificacion]
}


export default router;
