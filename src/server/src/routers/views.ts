import { Router } from "express";
import ViewsController from "../controllers/views.controller";
import catchAsync from "../utils/catchAsync";

const views = Router();

views.get("/", catchAsync(ViewsController.renderLogin));
views.get("/home", catchAsync(ViewsController.renderHome));

export default views;
