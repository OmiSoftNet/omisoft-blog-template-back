import { Router } from "express";
import { API_ROUTES } from "../config/apiRoutes";
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  getAllUsersController,
  updateUserController,
  createModeratorController,
  deleteUserForAdminController,
  clearPasswordController,
  getAdminController,
} from "../controllers/users";
import { adminVerifyMiddleware } from "../middleware/roleVerify.moddleware";

export default () => {
  const route = Router();

  route.get(API_ROUTES.USERS.GET_ADMIN, getAdminController);
  route.get(API_ROUTES.USERS.USER_BY_ID, getUserByIdController);
  route.get(API_ROUTES.USERS.ALL_USERS, getAllUsersController);
  route.post(API_ROUTES.USERS.CREATE, createUserController);
  route.post(
    API_ROUTES.USERS.CREATE_MODERATOR,
    adminVerifyMiddleware,
    createModeratorController
  );
  route.delete(API_ROUTES.USERS.DELETE, deleteUserController);
  route.delete(
    API_ROUTES.USERS.DELETE_FOR_ADMIN,
    adminVerifyMiddleware,
    deleteUserForAdminController
  );
  route.put(API_ROUTES.USERS.UPDATE_USER, updateUserController);
  route.put(
    API_ROUTES.USERS.CLEAR_PASSWORD,
    adminVerifyMiddleware,
    clearPasswordController
  );

  return route;
};
