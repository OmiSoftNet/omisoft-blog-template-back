import { NextFunction, Response } from "express";
import AppError from "./ErrorService";

class ResponseService {
  static success(res: Response, data?: any, code?: number) {
    return res.status(code || 200).json({ status: "success", data });
  }

  //next function we need for centralized error handling
  static error(next: NextFunction, message: string, code?: number, trace?: string, data?: { [key: string]: string }) {
    return next(new AppError(message, code, trace, data));
  }
}

export default ResponseService;
