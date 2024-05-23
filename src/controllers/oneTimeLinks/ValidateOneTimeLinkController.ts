import { RequestHandler } from "express";
import OneTimeLinksModel from "../../models/OneTimeLinks/OneTimeLinkModel";
import ResponseService from "../../services/ResponseService";
import { TEXT } from "../../utils/JoiErrors";
import validateFields, { JOI } from "../../utils/validation";
import Joi from "joi";

type RequestData = {
  token: string;
};

const validationSchema = JOI.object({
  token: Joi.string().strict().required(),
});

const ValidateOneTimeLinkController: RequestHandler<RequestData> = async (req, res, next) => {
  if (await validateFields(validationSchema, req, res, next)) {
    return;
  }

  const token = req.body.token;

  try {
    const oneTimeLink = await OneTimeLinksModel.findOne({
      token,
    });

    if (!oneTimeLink) {
      return ResponseService.error(next, TEXT.ERRORS.notFound);
    }

    await OneTimeLinksModel.findOneAndDelete({
      token,
    });

    ResponseService.success(res, oneTimeLink);
  } catch (err: any) {
    ResponseService.error(next, err.message);
  }
};

export default ValidateOneTimeLinkController;
