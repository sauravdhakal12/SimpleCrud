import express from "express";
import { addNewProduct, deleteAProduct, editAProduct, getAllProducts, getAProduct } from "../controllers/products.controller.js";
import validateSchema from "../middlewares/validation.middleware.js";

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.post("/", validateSchema, addNewProduct);
productsRouter.get("/:id", getAProduct);
productsRouter.patch("/:id", validateSchema, editAProduct);
productsRouter.delete("/:id", deleteAProduct);

export default productsRouter;
