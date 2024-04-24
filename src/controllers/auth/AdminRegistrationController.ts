import { RequestHandler } from "express";
import Joi from "joi";
import UserModel from "../../models/Users/UserModel";
import { TEXT } from "../../utils/JoiErrors";
import ResponseService from "../../utils/ResponseService";
import validateFields, { JOI, PASSWORD_REGEX } from "../../utils/validation";
import { USER_ROLES } from "../../constants/roles";

const validationSchema = JOI.object({
  email: Joi.string().strict().email().required(),
  password: Joi.string().strict().pattern(PASSWORD_REGEX).required(),
});

const AdminRegistrationController: RequestHandler = async (req, res) => {
  if (await validateFields(validationSchema, req, res)) return;

  try {
    const existingAdmin = await UserModel.findOne({
      role: USER_ROLES.ADMIN,
    });
    if (existingAdmin) {
      return ResponseService.error(res, TEXT.ERRORS.roleExists);
    }

    const newAdmin = await UserModel.create({
      ...req.body,
      email: req.body.email.toLowerCase(),
      role: USER_ROLES.ADMIN,
    });
    const accessToken = newAdmin.generateAccessToken();
    const refreshToken = await newAdmin.generateRefreshToken();

    const { _id, email, createdAt, updatedAt } = newAdmin.toObject();

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

export default AdminRegistrationController;
