import { Client } from "pg";
import env from "./env";

const db = new Client({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: +!env.DB_PORT,
});

db.connect().then();

export default db;
