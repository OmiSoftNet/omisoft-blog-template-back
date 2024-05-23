import { RequestHandler } from "express";
import Joi from "joi";
import UserModel from "../../models/Users/UserModel";
import { TEXT } from "../../utils/JoiErrors";
import ResponseService from "../../services/ResponseService";
import validateFields, { JOI, PASSWORD_REGEX } from "../../utils/validation";

const validationSchema = JOI.object({
  email: Joi.string().strict().required(),
  password: Joi.string().strict().pattern(PASSWORD_REGEX).required(),
});

const ResetPasswordController: RequestHandler = async (req, res, next) => {
  const { password, email } = req.body;

  if (await validateFields(validationSchema, req, res, next)) return;

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return ResponseService.error(next, TEXT.ERRORS.wrongOldPassword);
    }

    user.setPassword(password);
    await user.save();
    res.status(201).end();
  } catch (error: any) {
    ResponseService.error(next, error.message);
  }
};

export default ResetPasswordController;
