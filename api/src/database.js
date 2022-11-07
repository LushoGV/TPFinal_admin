import sql from "mssql";

const sqlConfig = {
  user: "userPrueba",
  password: "prueba",
  database: "Facultad",
  server: "localhost\\SQLEXPRESS",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const connectDb = async () => {
  try {
    const pool = await sql.connect(sqlConfig);
    console.log("conectado");
    return pool;
  } catch (err) {
    console.log(err);
  }
};
