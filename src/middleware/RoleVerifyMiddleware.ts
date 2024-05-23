import { NextFunction, Request, Response } from "express";
import { USER_ROLES } from "../constants/UserRolesEnum";
import ResponseService from "../services/ResponseService";
import { TEXT } from "../utils/JoiErrors";
import { UserRequest } from "../../test/utils/UserRequest";

export const adminVerifyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const role = (req as UserRequest).role;
  if (role === USER_ROLES.ADMIN) {
    return next();
  } else return ResponseService.error(next, TEXT.ERRORS.unauthorized, 401);
};

export const moderatorVerifyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const role = (req as UserRequest).role;
  if (role === USER_ROLES.MODERATOR) {
    return next();
  } else return ResponseService.error(next, TEXT.ERRORS.unauthorized, 401);
};
