import { RequestHandler } from "express";
import Joi from "joi";
import UserModel from "../../models/Users/UserModel";
import validateFields, { JOI, PASSWORD_REGEX } from "../../utils/validation";
import ResponseService from "../../services/ResponseService";
import { TEXT } from "../../utils/JoiErrors";
import { USER_ROLES } from "../../constants/UserRolesEnum";

const validationSchema = JOI.object({
  email: Joi.string().strict().email().required(),
  password: Joi.string().strict().pattern(PASSWORD_REGEX).required(),
});

export const CreateModeratorController: RequestHandler = async (req, res, next) => {
  try {
    if (await validateFields(validationSchema, req, res, next)) return;

    const existingUser = await UserModel.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (existingUser) {
      return ResponseService.error(next, TEXT.ERRORS.userExists);
    }
    const newUser = await UserModel.create({
      ...req.body,
      role: USER_ROLES.MODERATOR,
      email: req.body.email.toLowerCase(),
    });

    const { _id, email, createdAt, updatedAt } = newUser.toObject();

    ResponseService.success(res, {
      _id,
      email,
      createdAt,
      updatedAt,
    });
  } catch (error: any) {
    ResponseService.error(next, error.message);
  }
};

export default CreateModeratorController;
