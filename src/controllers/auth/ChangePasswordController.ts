import { RequestHandler } from "express";
import Joi from "joi";
import UserModel from "../../models/Users/UserModel";
import { TEXT } from "../../utils/JoiErrors";
import ResponseService from "../../services/ResponseService";
import validateFields, { JOI, PASSWORD_REGEX } from "../../utils/validation";
import { UserRequest } from "../../../test/utils/UserRequest";

const validationSchema = JOI.object({
  password: Joi.string().strict().required(),
  newPassword: Joi.string().strict().pattern(PASSWORD_REGEX).required(),
});

const ChangePasswordController: RequestHandler = async (req, res, next) => {
  const { newPassword, password } = req.body;

  if (await validateFields(validationSchema, req, res, next)) return;

  try {
    const userId = (req as UserRequest).userId;
    const user = await UserModel.findById(userId);

    if (!user || !user.validatePassword(password)) {
      return ResponseService.error(next, TEXT.ERRORS.wrongOldPassword);
    }

    user.setPassword(newPassword);
    await user.save();
    res.status(201).end();
  } catch (error: any) {
    ResponseService.error(next, error.message);
  }
};

export default ChangePasswordController;
