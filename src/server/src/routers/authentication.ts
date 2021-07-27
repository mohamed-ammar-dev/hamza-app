import { Router } from "express";
import AuthenticationController from "../controllers/authentication.controller";
import catchAsync from "../utils/catchAsync";

const accounts = Router();

accounts.post("/signup", catchAsync(AuthenticationController.signUp));
accounts.post("/login", catchAsync(AuthenticationController.login));

export default accounts;
