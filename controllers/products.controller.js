import Product from "../models/products.model.js";
import Validations from "../validations/products.validation.js";
import Response from "../utils/response.utils.js";
import statusCode from "../utils/statusCode.utils.js";

import "express-async-errors";


/*
  FILTER FORMAT:
    /products/name=Demo&price[&lt]=100

  Supported operations: [lt, gt, lte, gte]
*/
export async function getAllProducts(req, res) {

  // Get query params
  const query = req.query;

  // Convert them to subsquent mongoose query
  const queryString = JSON.stringify(query);
  const newQ = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const queryObject = JSON.parse(newQ);

  // Fetch products from DB
  const products = await Product.find(queryObject);

  // Send success response with data
  const response = new Response({
    message: "Products fetched",
    data: products,
  });

  return res.json(response.raw);
}

export async function getAProduct(req, res) {

  // Get product if from url parameter
  const id = req.params.id;


  // Fetch product from db
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
    // Else return requested data
    const response = new Response({ message: "Successfully fetched requested product", data: product });
    return res.json(response.raw)
  }
}

export async function addNewProduct(req, res) {

  // Get data about product from body
  const body = req.body;

  // Make sure data is formatted properly
  const d = Validations.ProductSchema.parse(body)

  // Save the data
  const product1 = new Product(d);
  const data = await product1.save();

  const response = new Response({
    message: "Successfully added new product",
    data: data,
  })

  // Return response
  return res.json(response.raw);
}

export async function editAProduct(req, res) {

  // Get product's id and body
  const body = req.body;
  const id = req.params.id;

  // Parse and fetch
  const d = Validations.ProductEditSchema.parse(body);
  const product = await Product.findByIdAndUpdate(id, d, { new: true });

  // If noting gets deleted
  if (!product) {
    return res.status(statusCode.BAD_REQUEST).json({
      success: false,
      message: "Edit failed",
      error: "Product with provided id not found",
    });
  }
  else {

    // Create and return response
    const response = new Response({
      message: "Successfully edited the product",
      data: product,
    })

    return res.json(response.raw);
  }
}

export async function deleteAProduct(req, res) {

  // Get products id
  const id = req.params.id;

  // Find product and remove
  const product = await Product.findByIdAndDelete(id);

  // If noting gets deleted
  if (!product) {
    return res.status(statusCode.BAD_REQUEST).json({
      success: false,
      message: "Delete failed",
      error: "Product with provided id not found",
    });
  }

  else {

    // Return success response
    const response = new Response({
      message: "Successfully removed requested product",
      data: product,
    })
    return res.send(response.raw);
  }
}
