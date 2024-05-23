import { Response } from "express";
import isDevelopment from "../config";
import AppError from "../services/ErrorService";

const handleJWTExpiredError = () => new AppError("Your token has expired. Please login again!", 401);

const handleJWTError = () => new AppError("Invalid token. Please login again!", 401);

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err?.path}: ${err?.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match("(.*?(?<!\\))");
  const message = `Duplicate field value: ${value}. Please use another value.`;
  return new AppError(message, 400);
};

const sendErrorDev = (err: AppError, res: Response) => {
  const { statusCode = 500, status = "error", message = "Server error", stack, isOperational, ...restOfError } = err;
  res.status(statusCode).json({
    status,
    message,
    isOperational,
    details: restOfError.data ?? restOfError,
    stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  const { statusCode, status, message, isOperational } = err;

  // Operational, trusted errors: send message to client
  if (isOperational) {
    res.status(statusCode).json({
      status,
      message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

export default (err: AppError | Error, _: any, res: Response, __: any) => {
  let error: any = { ...err, message: err.message };
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

  if (isDevelopment) {
    sendErrorDev(error as AppError, res);
  } else {
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationErrorDB(error);
    sendErrorProd(error, res);
  }
};
