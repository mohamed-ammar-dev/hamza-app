import { Router } from "express";
import ProductController from "../controllers/products.controller";
import { ROLE } from "../interfaces/Interfaces";
import { restrictTo } from "../middlewares/admin";
import { auth } from "../middlewares/auth";
import catchAsync from "../utils/catchAsync";

const products = Router();

products.post(
  "/upload",
  auth,
  catchAsync(ProductController.saveUniqueProducts)
);

products.get("/today", auth, catchAsync(ProductController.getTodayProducts));

products.get(
  "/pending",
  auth,
  catchAsync(ProductController.getPendingProducts)
);

products.get(
  "/pending/more-info",
  auth,
  catchAsync(ProductController.moreInformationProducts)
);

products.get(
  "/pending/download",
  auth,
  restrictTo(ROLE.ADMIN),
  catchAsync(ProductController.downloadPendingProducts)
);

export default products;
