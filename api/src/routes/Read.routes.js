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

  const bool = await connectDb();
  const result = await bool.query(`select * from View_${table}`);
  return res.status(200).json(result.recordset);
});

router.get("/doctypes", async (req, res) => {
  const bool = await connectDb();
  const result = await bool.query(`select * from Tipo_Doc`);
  return res.status(200).json(result.recordset);
});
export default router;
