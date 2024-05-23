import { Router } from "express";
import { API_ROUTES } from "../config/ApiRoutes";
import {
  ClearPasswordController,
  CreateModeratorController,
  CreateUserController,
  DeleteUserController,
  DeleteUserForAdminController,
  GetAdminController,
  GetAllUsersController,
  GetMyProfileController,
  GetUserByIdController,
  UpdateUserController,
} from "../controllers/users";
import { adminVerifyMiddleware } from "../middleware/RoleVerifyMiddleware";
import authVerifyMiddleware from "../middleware/AuthVerifyMiddleware";

export default () => {
  const route = Router();

  route.put(API_ROUTES.USERS.CLEAR_PASSWORD, adminVerifyMiddleware, ClearPasswordController);
  route.post(API_ROUTES.USERS.CREATE_MODERATOR, adminVerifyMiddleware, CreateModeratorController);
  route.post(API_ROUTES.USERS.CREATE, CreateUserController);
  route.delete(API_ROUTES.USERS.DELETE, DeleteUserController);
  route.delete(API_ROUTES.USERS.DELETE_FOR_ADMIN, adminVerifyMiddleware, DeleteUserForAdminController);
  route.get(API_ROUTES.USERS.GET_ADMIN, GetAdminController);
  route.get(API_ROUTES.USERS.ALL_USERS, GetAllUsersController);
  route.get(API_ROUTES.USERS.GET_MY_PROFILE, authVerifyMiddleware, GetMyProfileController);
  route.get(API_ROUTES.USERS.USER_BY_ID, GetUserByIdController);
  route.put(API_ROUTES.USERS.UPDATE_USER, UpdateUserController);

  return route;
};
