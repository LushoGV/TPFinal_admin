import { Router } from "express";
import { connectDb } from "../database.js";
import getErrorMessage from "../helpers/errorHandling.js";
import { TABLES } from "../helpers/tables.js";

const router = Router();

router.delete("/delete/:table/:id", async (req, res) => {
  const { table, id } = req.params;

  if (!TABLES.includes(table.toLowerCase())) {
    return res
      .status(404)
      .json({ status: "NOT_FOUND", message: "TABLA NO ENCONTRADA" });
  }

  let queryString = `DELETE FROM ${table}`;

  switch (table) {
    case "alumnos":
      queryString += ` WHERE nro_legajo_a = ${id}`;
      break;

    case "profesores":
      queryString += ` WHERE nro_legajo_p = ${id}`;
      break;

    case "materias":
      queryString += ` WHERE cod_materia = ${id}`;
      break;

    case "examenes":
      let keysArray = id.split("&");
      queryString += ` WHERE  nro_legajo_a = ${keysArray[0]} AND cod_mat = '${keysArray[1]}' AND cod_turno = '${keysArray[2]}'`;
      break;

    default:
      break;
  }

  try {
    const bool = await connectDb();
    const result = await bool.query(queryString);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: getErrorMessage(error.originalError.info.number),
    });
  }

  return res
    .status(200)
    .json({ status: "ok", message: "Eliminado correctamente." });
});

export default router;
