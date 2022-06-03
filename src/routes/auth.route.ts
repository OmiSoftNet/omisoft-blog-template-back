import { Router } from "express";
import { API_ROUTES } from "../config/apiRoutes";
import {
  registerController,
  loginController,
  adminRegisterController,
  changePasswordController,
  updateTokensController,
  resetPasswordController,
} from "../controllers/auth";

export default () => {
  const route = Router();

  route.put(API_ROUTES.AUTH.RESET_PASSWORD, resetPasswordController);
  route.post(API_ROUTES.AUTH.REGISTER, registerController);
  route.post(API_ROUTES.AUTH.LOGIN, loginController);
  route.post(API_ROUTES.AUTH.REFRESH_TOKEN, updateTokensController);
  route.post(API_ROUTES.AUTH.CHANGE_PASSWORD, changePasswordController);
  route.post(API_ROUTES.AUTH.REGISTER_ADMIN, adminRegisterController);

  return route;
};
