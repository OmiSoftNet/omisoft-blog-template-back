import { Request, Response, NextFunction } from "express";
import { TEXT } from "../utils/JoiErrors";
import AppError from "../services/ErrorService";
import { API_ROUTES } from "../config/ApiRoutes";
import ResponseService from "../services/ResponseService";
import { compareUrls } from "../utils/CompareUrls";

export default (req: Request, _res: Response, next: NextFunction) => {
  try {
    // protect all routes which defined on CONFIG except AUTH
    const definedRoutes: string[] = [];

    Object.entries(API_ROUTES).forEach(([_, value]) => {
      const routes = Object.values(value) as string[];
      definedRoutes.push(...routes);
    });

    if (definedRoutes.some((route) => compareUrls(route, req.url))) {
      return next();
    } else {
      throw new AppError(TEXT.ERRORS.noRoute, 404, "checkRoute");
    }
  } catch (error: any) {
    return ResponseService.error(next, TEXT.ERRORS.noRoute, 404, "checkRoute");
  }
};
