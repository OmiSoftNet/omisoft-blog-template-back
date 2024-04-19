import { RequestHandler } from "express";
import EmailsModel from "../../models/Emails/emails.model";
import validateFields, { JOI } from "../../utils/validation";
import Joi from "joi";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const validationSchema = JOI.object({
  email: Joi.string().strict().email().required(),
});

export const createEmailController: RequestHandler = async (req, res) => {
  try {
    if (await validateFields(validationSchema, req, res)) return;

    const existingEmail = await EmailsModel.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (existingEmail) {
      return ResponseService.error(res, TEXT.ERRORS.emailExists);
    }
    const newEmail = await EmailsModel.create({
      email: req.body.email.toLowerCase(),
    });

    const { _id, email, createdAt, updatedAt } = newEmail.toObject();

    ResponseService.success(res, {
      _id,
      email,
      createdAt,
      updatedAt,
    });
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};

export default createEmailController;
