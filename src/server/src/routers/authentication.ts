import { Router } from "express";
import AuthenticationController from "../controllers/authentication.controller";
import { ROLE } from "../interfaces/Interfaces";
import { restrictTo } from "../middlewares/admin";
import { auth } from "../middlewares/auth";
import catchAsync from "../utils/catchAsync";

const authentication = Router();

authentication.post(
  "/signup",
  auth,
  restrictTo(ROLE.ADMIN),
  catchAsync(AuthenticationController.signUp)
);
authentication.post("/login", catchAsync(AuthenticationController.login));
authentication.get(
  "/logout",
  auth,
  catchAsync(AuthenticationController.logout)
);

export default authentication;
