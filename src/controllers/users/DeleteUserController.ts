import { Request, Response } from "express";
import UserModel from "../../models/Users/UserModel";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";
import { UserRequest } from "../../../test/utils/UserRequest";

const DeleteUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const prevUser = await UserModel.findOne({ _id: userId });
    if (!prevUser) {
      return ResponseService.error(res, TEXT.ERRORS.userDoesntExists);
    }

    const jwtUserId = (req as UserRequest).userId;
    if (jwtUserId !== req.params.id) {
      return ResponseService.error(res, TEXT.ERRORS.somethingWentWrong);
    }

    await UserModel.findOneAndDelete({ _id: userId });

    ResponseService.success(res, prevUser);
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};

export default DeleteUserController;
