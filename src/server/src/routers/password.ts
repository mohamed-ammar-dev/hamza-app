import { Router } from "express";
import PasswordController from "../controllers/password.controller";
import catchAsync from "../utils/catchAsync";

const password = Router();

password.get("/token/:email", catchAsync(PasswordController.generateToken));
password.post("/forgot/:token", catchAsync(PasswordController.resetPassword));

export default password;
