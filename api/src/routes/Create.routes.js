import { Router } from "express";
import { connectDb } from "../database.js";
import getErrorMessage from "../helpers/errorHandling.js";
import sql from "mssql";
import { TABLES } from "../helpers/tables.js";
const router = Router();

router.post("/create/:table", async (req, res) => {
  const bool = await connectDb();
  console.log(req.body);
  console.log(req.params);
  const { table } = req.params; //Alumnos, Profesores, Examenes, Materias

  if (!TABLES.includes(table.toLowerCase())) {
    return res
      .status(404)
      .json({ status: "NOT_FOUND", message: "TABLA NO ENCONTRADA" });
  }

  const queryString = createQueryString(table, req.body);

  try {
    const result = await bool.query(queryString);
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

export default router;

const createQueryString = (table, body) => {
  return `INSERT INTO ${table} (${Object.keys(body).join(
    ", "
  )}) values(${Object.values(body).join(", ")})`;
};
