import { Router } from "express";
import { API_ROUTES } from "../config/ApiRoutes";
import { GenerateOneTimeLinkController, ValidateOneTimeLinkController } from "../controllers/oneTimeLinks";

export default () => {
  const route = Router();

  route.post(API_ROUTES.ONE_TIME_LINKS.GENERATE, GenerateOneTimeLinkController);
  route.post(API_ROUTES.ONE_TIME_LINKS.VALIDATE, ValidateOneTimeLinkController);

  return route;
};
