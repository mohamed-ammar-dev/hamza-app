import { Router } from "express";
import AccountController from "../controllers/accounts.controller";
import auth from "../middlewares/auth";
import catchAsync from "../utils/catchAsync";

const accounts = Router();

accounts
  .route("/")
  .get(catchAsync(auth), catchAsync(AccountController.getAccounts))
  .delete(catchAsync(auth), catchAsync(AccountController.deleteAccount));

export default accounts;
