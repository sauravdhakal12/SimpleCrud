import { MongooseError } from "mongoose";
import { ZodError } from "zod";
import statusCode from "../utils/statusCode.js";

export default function errorHandler(err, req, res, next) {

  // FOR ZOD ERROR
  if (err instanceof ZodError) {
    const validationErrors = [];

    for (let error of err.errors) {
      const d = {};

      d.path = error.path[0];
      d.message = error.message;

      validationErrors.push(d);
    }

    return res.status(statusCode.BAD_REQUEST).json({
      success: false,
      message: "Validation Error",
      error: "Validation failed for certain fields",
      validationErrors: validationErrors,
    });
  }

  // FOR MONGOOSE ERROR
  else if (err instanceof MongooseError) {
    if (err.name === "CastError")
      return res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: "Product Id error",
        error: "Invalid format for product id",
      });
  }

  return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: "Something went wrong",
    error: "Something went wrong",
  });
}
