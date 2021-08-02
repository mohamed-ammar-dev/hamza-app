import { Router } from "express";
import AuthenticationController from "../controllers/authentication.controller";
import { auth } from "../middlewares/auth";
import catchAsync from "../utils/catchAsync";

const accounts = Router();

accounts.post("/signup", catchAsync(AuthenticationController.signUp));
accounts.post("/login", catchAsync(AuthenticationController.login));
accounts.get("/logout", auth, catchAsync(AuthenticationController.logout));

export default accounts;
