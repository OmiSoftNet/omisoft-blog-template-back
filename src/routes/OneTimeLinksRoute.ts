import { Router } from "express";
import { API_ROUTES } from "../config/apiRoutes";
import { generateOneTimeLinkController, validateOneTimeLinkController } from "../controllers/oneTimeLinks";

export default () => {
  const route = Router();

  route.post(API_ROUTES.ONE_TIME_LINKS.VALIDATE, validateOneTimeLinkController);
  route.post(API_ROUTES.ONE_TIME_LINKS.GENERATE, generateOneTimeLinkController);

  return route;
};
