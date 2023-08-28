// db.js
import { Pool } from "pg";

let pool;

if (!pool) {
  pool = new Pool({
    user: "postgres",
    password: "",
    host: "localhost",
    port: 5432,
    database: "jobboard",
  });
}

export default pool ;