import express from "express";
import productsRouter from "./routes/products.routes.js";
import connectDb from "./utils/db.utils.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import unknownEndpoint from "./utils/unknownEndpoint.utils.js";

const app = express();

app.use(express.json());

connectDb();

app.use("/products", productsRouter);
app.use(unknownEndpoint);

app.use(errorHandler);

export default app;
