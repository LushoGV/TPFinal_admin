import express from "express";
import routerCreate from "./routes/Create.routes.js";
import routerRead from "./routes/Read.routes.js";
import routerUpdate from './routes/Update.routes.js'
import cors from "cors";
import "./database.js";
import { connectDb } from "./database.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/", routerCreate);
app.use("/api/", routerRead);
app.use("/api/", routerUpdate);

app.listen(3000, () => {
  console.log("Prueba 3000");
  connectDb();
});
