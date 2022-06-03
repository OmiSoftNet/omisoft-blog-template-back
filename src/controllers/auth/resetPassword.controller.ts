import { RequestHandler } from "express";
import Joi from "joi";
import { PASSWORD_REGEX } from "../../config/auth";
import UserModel from "../../models/Users/User.model";
import { TEXT } from "../../utils/JoiErrors";
import ResponseService from "../../utils/ResponseService";
import validateFields, { JOI } from "../../utils/validation";

const validationSchema = JOI.object({
  email: Joi.string().strict().required(),
  password: Joi.string().strict().pattern(PASSWORD_REGEX).required(),
});

const resetPasswordController: RequestHandler = async (req, res) => {
  const { password, email } = req.body;

  if (await validateFields(validationSchema, req, res)) return;

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return ResponseService.error(res, 400, TEXT.ERRORS.wrongOldPassword);
    }

    user.setPassword(password);
    await user.save();
    res.status(201).end();
  } catch (error: any) {
    ResponseService.error(res, 400, error.message);
  }
};

export default resetPasswordController;
