import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ResponseService from "../utils/ResponseService";
import CONFIG from "../config";
import UserModel from "../models/Users/User.model";
import { IUser } from "../models/Users/types";

interface JwtPayload {
  _id: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
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

    if (!parsedToken) return ResponseService.error(res, 401);

    const { _id } = jwt.verify(parsedToken, CONFIG.JWT_SECRET) as JwtPayload;
    const userData = await UserModel.findById(_id);

    if (!userData) return ResponseService.error(res, 401);

    req.user = userData as IUser;

    next();
  } catch (error) {
    return ResponseService.error(res, 401);
  }
};
