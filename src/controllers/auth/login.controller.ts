import { RequestHandler } from "express";
import UserModel from "../../models/Users/User.model";
import ResponseService from "../../utils/ResponseService";
import validateFields, { JOI } from "../../utils/validation";
import Joi from "joi";
import { TEXT } from "../../utils/JoiErrors";

const validationSchema = JOI.object({
  email: Joi.string().strict().required(),
  password: Joi.string().strict().required(),
});

const loginController: RequestHandler = async (req, res) => {
  if (await validateFields(validationSchema, req, res)) return;

  try {
    const user = await UserModel.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (!user || !user.validatePassword(req.body.password))
      return ResponseService.error(res, 401, TEXT.ERRORS.wrongCredentials);

    const accessToken = user.generateAccessToken();
    const refreshToken = await user.generateRefreshJWT();

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
    ResponseService.error(res, 400, err.message);
  }
};

export default loginController;
