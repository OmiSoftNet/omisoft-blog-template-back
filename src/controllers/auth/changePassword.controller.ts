import { RequestHandler } from "express";
import Joi from "joi";
import { PASSWORD_REGEX } from "../../config/auth";
import UserModel from "../../models/Users/User.model";
import { TEXT } from "../../utils/JoiErrors";
import ResponseService from "../../utils/ResponseService";
import validateFields, { JOI } from "../../utils/validation";

const validationSchema = JOI.object({
  password: Joi.string().strict().required(),
  newPassword: Joi.string().strict().pattern(PASSWORD_REGEX).required(),
});

const changePasswordController: RequestHandler = async (req, res) => {
  const { newPassword, password } = req.body;

  if (await validateFields(validationSchema, req, res)) return;

  try {
    const user = await UserModel.findById(req.user._id);

    if (!user || !user.validatePassword(password)) {
      return ResponseService.error(res, 400, TEXT.ERRORS.wrongOldPassword);
    }

    user.setPassword(newPassword);
    await user.save();
    res.status(201).end();
  } catch (error: any) {
    ResponseService.error(res, 400, error.message);
  }
};

export default changePasswordController;
