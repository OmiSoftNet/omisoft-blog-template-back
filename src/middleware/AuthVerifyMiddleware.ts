import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ResponseService from "../services/ResponseService";
import CONFIG from "../config";
import { TEXT } from "../utils/JoiErrors";
import { UserRequest } from "../../test/utils/UserRequest";

interface JwtPayload {
  _id: string;
  role: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    if (
      req.originalUrl.includes("blog") ||
      req.originalUrl.includes("login") ||
      req.originalUrl.includes("register") ||
      req.originalUrl.includes("one-time-link") ||
      req.originalUrl.includes("reset-password") ||
      req.originalUrl.includes("swagger")
    ) {
      return next();
    }

    const parsedToken = req.headers.authorization?.split(" ")[1] ?? "";
    if (!parsedToken) {
      return ResponseService.error(next, TEXT.ERRORS.unauthorized, 401);
    }

    const { _id, role } = jwt.verify(parsedToken, CONFIG.JWT_SECRET) as JwtPayload;
    (req as UserRequest).userId = _id;
    (req as UserRequest).role = role;

    next();
  } catch (error) {
    return ResponseService.error(next, TEXT.ERRORS.unauthorized, 401);
  }
};
