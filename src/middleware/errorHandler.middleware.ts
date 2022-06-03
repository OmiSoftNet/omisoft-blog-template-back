import { ErrorRequestHandler } from "express";
import { TEXT } from "../utils/JoiErrors";
import ResponseService from "../utils/ResponseService";

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  ResponseService.error(
    res,
    err.status || 500,
    err.message || TEXT.ERRORS.somethingWentWrong
  );
};

export default errorHandlerMiddleware;
