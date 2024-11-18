import "dotenv/config";

const e = process.env;

export const PORT = Number(e.PORT);
export const DB_URL = e.DB_URL;
