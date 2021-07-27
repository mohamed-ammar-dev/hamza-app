import { Router } from "express";
import ProductController from "../controllers/products.controller";
import catchAsync from "../utils/catchAsync";

const products = Router();

products.post("/upload", catchAsync(ProductController.saveUniqueProducts));

products.get("/today", catchAsync(ProductController.getTodayProducts));

products.get("/pending", catchAsync(ProductController.getPendingProducts));

products.get(
  "/pending/more-info",
  catchAsync(ProductController.moreInformationProducts)
);

products.get(
  "/pending/download",
  catchAsync(ProductController.downloadPendingProducts)
);

export default products;
