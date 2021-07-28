import { Router } from "express";
import AccountController from "../controllers/accounts.controller";
import { ROLE } from "../interfaces/Interfaces";
import { restrictTo } from "../middlewares/admin";
import { auth } from "../middlewares/auth";
import catchAsync from "../utils/catchAsync";

const accounts = Router();

accounts
  .route("/")
  .get(auth, catchAsync(AccountController.getAccounts))
  .delete(
    auth,
    restrictTo(ROLE.ADMIN),
    catchAsync(AccountController.deleteAccount)
  );

export default accounts;
