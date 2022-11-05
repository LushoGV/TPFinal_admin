import sql from "mssql";

const sqlConfig = {
  user: "userprueba",
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
    return pool;
  } catch (err) {
    console.log(err);
  }
};
