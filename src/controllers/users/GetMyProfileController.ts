import UserModel from "../../models/Users/UserModel";
import { RequestHandler } from "express";
import ResponseService from "../../services/ResponseService";
import { TEXT } from "../../utils/JoiErrors";
import { UserRequest } from "../../../test/utils/UserRequest";

const GetMyProfileController: RequestHandler = async (req, res, next) => {
  const userId = (req as UserRequest).userId;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return ResponseService.error(next, TEXT.ERRORS.userDoesntExists);
    }

    const { _id, email, createdAt, updatedAt } = user.toObject();

    ResponseService.success(res, {
      _id,
      email,
      createdAt,
      updatedAt,
    });
  } catch (error: any) {
    ResponseService.error(next, error.message);
  }
};

export default GetMyProfileController;
