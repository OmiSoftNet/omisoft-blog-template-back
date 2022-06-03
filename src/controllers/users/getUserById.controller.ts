import UserModel from "../../models/Users/User.model";
import { RequestHandler } from "express";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const getUserByIdController: RequestHandler = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return ResponseService.error(res, 400, TEXT.ERRORS.userDoesntExists);
    }

    const { _id, email, createdAt, updatedAt } = user.toObject();

    ResponseService.success(res, {
      _id,
      email,
      createdAt,
      updatedAt,
    });
  } catch (error: any) {
    ResponseService.error(res, 400, error.message);
  }
};

export default getUserByIdController;
