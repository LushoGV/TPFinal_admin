import { Router } from "express";
import { connectDb } from "../database.js";
import getErrorMessage from "../helpers/errorHandling.js";
import sql from "mssql";
import { TABLES } from "../helpers/tables.js";
const router = Router();

router.get("/read/:table", async (req, res) => {
  const { table } = req.params;

  if (!TABLES.includes(table.toLowerCase())) {
    return res
      .status(404)
      .json({ status: "NOT_FOUND", message: "TABLA NO ENCONTRADA" });
  }
  try {
    const bool = await connectDb();
    console.log(bool);
    const result = await bool.query(`select * from View_${table}`);
    console.log(result);

    return res.status(200).json(result.recordset);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: getErrorMessage(error.originalError.info.number),
    });
  }
});

router.get("/doctypes", async (req, res) => {
  const bool = await connectDb();
  const result = await bool.query(`select * from Tipo_Doc`);
  return res.status(200).json(result.recordset);
});

router.get("/titles", async (req, res) => {
  const bool = await connectDb();
  const result = await bool.query(`select * from Titulos`);
  return res.status(200).json(result.recordset);
});

router.get("/count_turnos", async (req, res)=> {
  const bool = await connectDb()
  const result = await bool.query(`SELECT count(*) as 'Cantidad', desc_turno FROM View_turnos group by desc_turno`)
  return res.status(200).json(result.recordset);
})

export default router;
