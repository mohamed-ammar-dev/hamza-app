import { Router } from "express";
import ProductController from "../controllers/products.controller";
import cleanCache from "../middlewares/cleanCache";
import catchAsync from "../utils/catchAsync";

const products = Router();

products.post(
  "/upload-data",
  cleanCache,
  catchAsync(ProductController.saveUniqueProducts)
);

products.get("/today-products", catchAsync(ProductController.getTodayProducts));

products.get(
  "/pending-products",
  catchAsync(ProductController.getPendingProducts)
);

products.get(
  "/pending-more-info",
  catchAsync(ProductController.moreInformationProducts)
);

products.get(
  "/download-pending-products",
  cleanCache,
  catchAsync(ProductController.downloadPendingProducts)
);

export default products;
