import { RequestHandler } from "express";
import Joi from "joi";
import UserModel from "../../models/Users/User.model";
import { TEXT } from "../../utils/JoiErrors";
import ResponseService from "../../utils/ResponseService";
import validateFields, { JOI, PASSWORD_REGEX } from "../../utils/validation";
import { USER_ROLES } from "../../constants/roles";

const validationSchema = JOI.object({
  email: Joi.string().strict().email().required(),
  password: Joi.string().strict().pattern(PASSWORD_REGEX).required(),
});

const registerController: RequestHandler = async (req, res) => {
  if (await validateFields(validationSchema, req, res)) return;

  try {
    const existingUser = await UserModel.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (existingUser) {
      return ResponseService.error(res, TEXT.ERRORS.somethingWentWrong);
    }

    const newUser = await UserModel.create({
      ...req.body,
      email: req.body.email.toLowerCase(),
      role: USER_ROLES.USER,
    });
    const accessToken = newUser.generateAccessToken();
    const refreshToken = await newUser.generateRefreshToken();

    const { _id, email, createdAt, updatedAt } = newUser.toObject();

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
    ResponseService.error(res, err.message);
  }
};

export default registerController;
