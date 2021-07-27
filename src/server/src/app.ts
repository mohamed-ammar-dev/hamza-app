import "./db/mongodb";
import "./db/redis";
import express, { Request, NextFunction, json } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { join } from "path";
import compression from "compression";
import routerAuthentication from "./routers/authentication";
import routerProducts from "./routers/products";
import routerAccounts from "./routers/accounts";
import routerViews from "./routers/views";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/error.controller";
export const app = express();

const clientPath = join(__dirname, "../../client");
app.set("view engine", "hbs");
app.set("views", join(clientPath, "views"));

app.use(compression());
app.use(express.static(clientPath));
app.use(json({ limit: "10kb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(require("express-status-monitor")());
}

app.use(routerViews);
app.use("/auth", routerAuthentication);
app.use("/products", routerProducts);
app.use("/accounts", routerAccounts);

app.all("*", (req: Request, _, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
