import generator from "generate-password";
import { RequestHandler } from "express";
import OneTimeLinksModel from "../../models/OneTimeLinks/OneTimeLinkModel";
import UserModel from "../../models/Users/UserModel";
import { mailer } from "../../config/nodemailer";
import ResponseService from "../../services/ResponseService";
import { TEXT } from "../../utils/JoiErrors";
import validateFields, { JOI } from "../../utils/validation";
import Joi from "joi";
import CONFIG from "../../config";

type RequestData = {
  email: string;
};

const validationSchema = JOI.object({
  email: Joi.string().strict().email().required(),
});

const GenerateOneTimeLinkController: RequestHandler<RequestData> = async (req, res, next) => {
  if (await validateFields(validationSchema, req, res, next)) {
    return;
  }

  try {
    const token = generator.generate({ length: 20 });
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return ResponseService.error(next, TEXT.ERRORS.userDoesntExists);
    }
    await OneTimeLinksModel.create({
      token: token,
      email: req.body.email,
    });
    // In message.text is an address from which the page will open
    const message = {
      to: req.body.email,
      subject: "Password reset link",
      html: `
      <p>You have requested a password change. If you have not requested the change, please ignore this message.</p>
      <p>To change your password, please click <a href="${CONFIG.CLIENT_URL}/reset-password/${token}">Reset Password</a></p>
    `,
    };
    mailer(message);
    ResponseService.success(res, message);
  } catch (err: any) {
    ResponseService.error(next, err.message);
  }
};

export default GenerateOneTimeLinkController;
