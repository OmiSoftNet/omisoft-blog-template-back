import { NextFunction, Request, Response } from "express";
import { USER_ROLES } from "../constants/roles";
import ResponseService from "../utils/ResponseService";

export const adminVerifyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role === USER_ROLES.ADMIN) {
    return next();
  } else return ResponseService.error(res, 401);
};

export const moderatorVerifyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role === USER_ROLES.MODERATOR) {
    return next();
  } else return ResponseService.error(res, 401);
};
