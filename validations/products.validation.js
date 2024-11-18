import { z } from "zod";

// Add new product schema
export const ProductSchema = z.object({
  name: z.string({
    required_error: "Name field is required",
    invalid_type_error: "Name must be string"
  }),
  price: z.number({
    required_error: "Price field is required",
    invalid_type_error: "Price must be number"
  }).min(1, {
    message: "Price must be postitve integer"
  }),
  quantity: z.number({
    required_error: "Quantity field is required",
    invalid_type_error: "Quantity must be number"
  }).min(1, {
    message: "Quantity must be postitve integer",
  })
})

// For edit, copy from above, make fields optional and make sure all atleast one field is provided
export const ProductEditSchema = ProductSchema.partial().refine((input) => {
  return (input.name !== undefined || input.price !== undefined || input.quantity !== undefined)
}, {
  message: "Products Name or Price or Quantity is required"
})
