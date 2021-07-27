import { Router } from "express";
import ProductController from "../controllers/products.controller";
import auth from "../middlewares/auth";
import catchAsync from "../utils/catchAsync";

const products = Router();

products.post(
  "/upload",
  catchAsync(auth),
  catchAsync(ProductController.saveUniqueProducts)
);

products.get(
  "/today",
  catchAsync(auth),
  catchAsync(ProductController.getTodayProducts)
);

products.get(
  "/pending",
  catchAsync(auth),
  catchAsync(ProductController.getPendingProducts)
);

products.get(
  "/pending/more-info",
  catchAsync(auth),
  catchAsync(ProductController.moreInformationProducts)
);

products.get(
  "/pending/download",
  catchAsync(auth),
  catchAsync(ProductController.downloadPendingProducts)
);

export default products;
