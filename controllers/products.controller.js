import Product from "../models/products.model.js";
import Response from "../utils/response.utils.js";
import statusCode from "../utils/statusCode.utils.js";

import "express-async-errors";

/*
  FILTER FORMAT:
    /products/name=Demo&price[&lt]=100

  Supported operations: [lt, gt, lte, gte]
*/
export async function getAllProducts(req, res) {

  const query = req.query;

  // Convert query params to subsquent mongoose query
  const queryString = JSON.stringify(query);
  const newQ = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const queryObject = JSON.parse(newQ);

  const products = await Product.find(queryObject);

  const response = new Response({
    message: "Products fetched",
    data: products,
  });

  return res.json(response.raw);
}

export async function getAProduct(req, res) {

  const id = req.params.id;

  const product = await Product.findById(id);

  // If null gets returned, id was invalid
  if (!product) {
    return res.status(statusCode.BAD_REQUEST).json({
      success: false,
      message: "Product Id error",
      error: "Invalid product id",
    });
  }
  else {
    const response = new Response({ message: "Successfully fetched requested product", data: product });
    return res.json(response.raw)
  }
}

export async function addNewProduct(req, res) {

  // Data is validated in middleware, just use that
  const product1 = new Product(res.locals.validated);
  const data = await product1.save();

  const response = new Response({
    message: "Successfully added new product",
    data: data,
  })

  return res.json(response.raw);
}

export async function editAProduct(req, res) {

  const id = req.params.id;

  // Data is validated in middleware, just use that
  const product = await Product.findByIdAndUpdate(id, res.locals.validated, { new: true });

  // If noting gets deleted, invalid product id
  if (!product) {
    return res.status(statusCode.BAD_REQUEST).json({
      success: false,
      message: "Edit failed",
      error: "Product with provided id not found",
    });
  }
  else {

    const response = new Response({
      message: "Successfully edited the product",
      data: product,
    })

    return res.json(response.raw);
  }
}

export async function deleteAProduct(req, res) {

  const id = req.params.id;

  const product = await Product.findByIdAndDelete(id);

  // If noting gets deleted, invalid product id
  if (!product) {
    return res.status(statusCode.BAD_REQUEST).json({
      success: false,
      message: "Delete failed",
      error: "Product with provided id not found",
    });
  }

  else {

    const response = new Response({
      message: "Successfully removed requested product",
      data: product,
    })
    return res.send(response.raw);
  }
}
