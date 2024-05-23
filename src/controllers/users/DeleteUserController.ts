import { Request, RequestHandler, Response } from "express";
import UserModel from "../../models/Users/UserModel";
import ResponseService from "../../services/ResponseService";
import { TEXT } from "../../utils/JoiErrors";
import { UserRequest } from "../../../test/utils/UserRequest";

const DeleteUserController: RequestHandler = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const prevUser = await UserModel.findOne({ _id: userId });
    if (!prevUser) {
      return ResponseService.error(next, TEXT.ERRORS.userDoesntExists);
    }

    const jwtUserId = (req as UserRequest).userId;
    if (jwtUserId !== req.params.id) {
      return ResponseService.error(next, TEXT.ERRORS.somethingWentWrong);
    }

    await UserModel.findOneAndDelete({ _id: userId });

    ResponseService.success(res, prevUser);
  } catch (error: any) {
    ResponseService.error(next, error.message);
  }
};

export default DeleteUserController;
