import { RequestHandler } from "express";
import UserModel from "../../models/Users/UserModel";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const DeleteUserForAdminController: RequestHandler = async (req, res) => {
  const userId = req.params.id;
  try {
    const prevUser = await UserModel.findOne({ _id: userId });

    if (!prevUser) {
      return ResponseService.error(res, TEXT.ERRORS.userDoesntExists);
    }
    await UserModel.findOneAndDelete({ _id: userId });

    ResponseService.success(res, prevUser);
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};

export default DeleteUserForAdminController;
