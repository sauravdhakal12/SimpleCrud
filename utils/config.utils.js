import "dotenv/config";

const e = process.env;

const PORT = Number(e.PORT);
const DB_URL = e.DB_URL;

export default {
  PORT,
  DB_URL
}
