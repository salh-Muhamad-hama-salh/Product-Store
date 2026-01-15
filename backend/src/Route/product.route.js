import express from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetAllProducts,
  GetProductById,
  UpdateProduct,
} from "../Controller/product.controller.js";

export const routeProduct = express.Router();

routeProduct.get("/", GetAllProducts);
routeProduct.get("/:id", GetProductById);
routeProduct.post("/", CreateProduct);
routeProduct.put("/:id", UpdateProduct);
routeProduct.delete("/:id", DeleteProduct);
