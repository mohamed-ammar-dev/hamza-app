import { Response } from "express";
import AppError from "../utils/appError";
import { error } from "../interfaces/Interfaces";

const handleJWTError = () => new AppError("Invalid token.", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired!", 401);

const sendErrorDev = (err: error, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err: error, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  // Programming or other unknown error: don't leak error details'

  // 1) Log error
  console.error(`ERROR: `, err);

  // 2) Send generic message
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
};

export = (err: error, _, res: Response, _2) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") return sendErrorDev(err, res);

  if (err.name === "JsonWebTokenError") (err as AppError) = handleJWTError();
  if (err.name === "TokenExpiredError")
    (err as AppError) = handleJWTExpiredError();
  sendErrorProd(err, res);
};
