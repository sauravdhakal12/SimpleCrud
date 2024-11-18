import Validations from "../validations/products.validation.js";
import "express-async-errors";

export default function validateSchema(req, res, next) {
  let validated;

  if (req.method === "PATCH")
    validated = Validations.ProductEditSchema.parse(req.body);
  else
    validated = Validations.ProductSchema.parse(req.body);

  res.locals.validated = validated;
  next();
}
