import express from "express";
import { addNewProduct, deleteAProduct, editAProduct, getAllProducts, getAProduct } from "../controllers/products.controller.js";

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.post("/", addNewProduct);
productsRouter.get("/:id", getAProduct);
productsRouter.patch("/:id", editAProduct);
productsRouter.delete("/:id", deleteAProduct);

export default productsRouter;
