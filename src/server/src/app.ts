import "./db/mongodb";
import "./db/redis";
import express, { Request, NextFunction, json } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { join } from "path";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import compression from "compression";
import routerAuthentication from "./routers/authentication";
import routerProducts from "./routers/products";
import routerAccounts from "./routers/accounts";
import routerViews from "./routers/views";
import routerPassword from "./routers/password";
import globalErrorHandler from "./controllers/error.controller";

export const app = express();

const limiterLogin = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000, // 1 hour to milliseconds
  message: "Too many requests from this IP, please try again in an hour!",
});

const limiterApi = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000, // 1 hour to milliseconds
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use(helmet());

const clientPath = join(__dirname, "../../client");
app.set("view engine", "hbs");
app.set("views", join(clientPath, "views"));

app.use(compression());
app.use(json({ limit: "10kb" }));

app.use(mongoSanitize());
app.use(xss());

app.use(express.static(clientPath));
app.use(cookieParser(process.env.COOKIE_SECRET));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(require("express-status-monitor")());
}

app.use("/auth", limiterLogin, routerAuthentication);

app.use(limiterApi);
app.use("/", routerViews);
app.use("/products", routerProducts);
app.use("/accounts", routerAccounts);
app.use("/password", routerPassword);

app.all("*", (_: Request, res, _2: NextFunction) => {
  res.status(404).render("error.hbs");
});

app.use(globalErrorHandler);
