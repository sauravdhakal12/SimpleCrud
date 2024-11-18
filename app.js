import express from "express";
import productsRouter from "./routes/products.routes.js";
import connectDb from "./utils/db.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

connectDb();

app.use("/products", productsRouter);
app.use(errorHandler);

export default app;
