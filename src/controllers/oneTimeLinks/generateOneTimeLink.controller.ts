import generator from "generate-password";
import { RequestHandler } from "express";
import OneTimeLinksModel from "../../models/OneTimtLinks/oneTimeLinks";
import UserModel from "../../models/Users/User.model";
import { mailer } from "../../config/nodemailer";
import ResponseService from "../../utils/ResponseService";

type RequestData = {
  email: string;
};

const generateOneTimeLinkController: RequestHandler<RequestData> = async (
  req,
  res
) => {
  try {
    const token = generator.generate({ length: 20 });
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return ResponseService.error(res, 400);
    }
    await OneTimeLinksModel.create({
      token: token,
      email: req.body.email,
    });
    // In message.text is an address from which the page will open
    const message = {
      to: req.body.email,
      subject: "Password reset link",
      text:
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/reset-password/${token}`
          : `http://localhost:3000/reset-password/${token}`,
    };
    mailer(message);
    ResponseService.success(res, message);
  } catch (err: any) {
    ResponseService.error(res, 400, err.message);
  }
};

export default generateOneTimeLinkController;
