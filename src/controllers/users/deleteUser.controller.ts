import { Request, Response } from "express";
import UserModel from "../../models/Users/User.model";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const deleteUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const prevUser = await UserModel.findOne({ _id: userId });

    if (!prevUser) {
      return ResponseService.error(res, 400, TEXT.ERRORS.userDoesntExists);
    }
    if (req.user._id !== req.params.id) {
      return ResponseService.error(res, 400, TEXT.ERRORS.somethingWentWrong);
    }
    await UserModel.findOneAndDelete({ _id: userId });

    ResponseService.success(res, prevUser);
  } catch (error: any) {
    ResponseService.error(res, 400, error.message);
  }
};

export default deleteUserController;
