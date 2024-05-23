import { RequestHandler } from "express";
import UserModel from "../../models/Users/UserModel";
import ResponseService from "../../services/ResponseService";
import validateFields, { JOI } from "../../utils/validation";
import Joi from "joi";
import { TEXT } from "../../utils/JoiErrors";

const validationSchema = JOI.object({
  email: Joi.string().strict().required(),
  password: Joi.string().strict().required(),
});

const LoginController: RequestHandler = async (req, res, next) => {
  if (await validateFields(validationSchema, req, res, next)) return;

  try {
    const user = await UserModel.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (!user || !user.validatePassword(req.body.password))
      return ResponseService.error(next, TEXT.ERRORS.wrongCredentials, 401);

    const accessToken = user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    const { _id, email, createdAt, updatedAt } = user.toObject();

    ResponseService.success(res, {
      user: {
        _id,
        email,
        createdAt,
        updatedAt,
      },
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    ResponseService.error(next, err.message);
  }
};

export default LoginController;
