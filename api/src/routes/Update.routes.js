import { Router } from "express";
import { connectDb } from "../database.js";
import getErrorMessage from "../helpers/errorHandling.js";
import sql from "mssql";
import { TABLES } from "../helpers/tables.js";
const router = Router();

router.put('/update/:table/:id', (req, res)=>{

    const {table, id} = req.params
    createQuery(table, id, req.body)
  

    return res.status(200).json('updated')
})

const createQuery = (table, id, body) => {
    let strQuery = `UPDATE ${table} SET`
 
    let bodyArray = Object.entries(body)
    bodyArray.map((element) => {
        strQuery += ` ${element[0]} = ${element[1]},`
    })

    strQuery = strQuery.slice(0, -1)
    
    switch (table) {
        case "alumnos":
            strQuery += ` WHERE nro_legajo_a = ${id}`
            break;

        case "profesores":
            strQuery += ` WHERE nro_legajo_p = ${id}`
            break;

        case "materias":
            strQuery += ` WHERE cod_materia = ${id}`
            break;
        
        case "examenes":
            let keysArray = id.split("&")
            // /UPDATE/examenes/nro_legajo_a & cod_mat & cod_turno
                strQuery += ` WHERE cod_materia = ${id}`
        break;

        default:
            break;
    }

    console.log(strQuery)

}


export default router;