import { RequestHandler } from "express";
import OneTimeLinksModel from "../../models/OneTimtLinks/oneTimeLinks";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

type RequestData = {
  token: string;
};

const validateOneTimeLinkController: RequestHandler<RequestData> = async (
  req,
  res
) => {
  const token = req.body.token;

  try {
    const oneTimeLink = await OneTimeLinksModel.findOne(
      {
        token,
      },
      ["-__v", "-updatedAt"]
    );

    if (!oneTimeLink) {
      return ResponseService.error(res, TEXT.ERRORS.notFound);
    }

    await OneTimeLinksModel.findOneAndDelete({
      token,
    });

    ResponseService.success(res, oneTimeLink);
  } catch (err: any) {
    ResponseService.error(res, err.message);
  }
};

export default validateOneTimeLinkController;
