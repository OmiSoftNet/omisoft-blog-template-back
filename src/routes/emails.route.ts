import { Router } from "express";
import { API_ROUTES } from "../config/apiRoutes";
import {
  createEmailController,
  getAllEmailsController,
} from "../controllers/emails";

export default () => {
  const route = Router();

  route.get(API_ROUTES.EMAILS.ALL_EMAILS, getAllEmailsController);
  route.post(API_ROUTES.EMAILS.CREATE, createEmailController);

  return route;
};
