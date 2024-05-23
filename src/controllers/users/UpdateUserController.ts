import { RequestHandler } from "express";
import Joi from "joi";
import UserModel from "../../models/Users/UserModel";
import { TEXT } from "../../utils/JoiErrors";
import ResponseService from "../../services/ResponseService";
import validateFields, { JOI } from "../../utils/validation";

const validationSchema = JOI.object({
  email: Joi.string().strict().email().required(),
});

const UpdateUserController: RequestHandler = async (req, res, next) => {
  if (await validateFields(validationSchema, req, res, next)) return;

  const userId = req.params.id;
  const { body } = req;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, body, {
      new: true,
    });

    if (!updatedUser) {
      return ResponseService.error(next, TEXT.ERRORS.userDoesntExists);
    }

    const { _id, email, createdAt, updatedAt } = updatedUser.toObject();

    ResponseService.success(res, { _id, email, createdAt, updatedAt });
  } catch (error: any) {
    ResponseService.error(next, error.message);
  }
};

export default UpdateUserController;
