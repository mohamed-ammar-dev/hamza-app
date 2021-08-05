import { Router } from "express";
import ViewsController from "../controllers/views.controller";
import { ROLE } from "../interfaces/Interfaces";
import { restrictTo } from "../middlewares/admin";
import { auth } from "../middlewares/auth";
import catchAsync from "../utils/catchAsync";

const views = Router();

views.get("/", catchAsync(ViewsController.renderLogin));
views.get(
  "/signup",
  auth,
  restrictTo(ROLE.ADMIN),
  catchAsync(ViewsController.renderSignUp)
);
views.get("/home", catchAsync(ViewsController.renderHome));
views.get("/password/forgot", catchAsync(ViewsController.renderForgotPassword));
views.get("/password/reset", catchAsync(ViewsController.renderResetPassword));

export default views;
