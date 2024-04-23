import { RequestHandler } from "express";
import EmailsModel from "../../models/Emails/emails.model";
import ResponseService from "../../utils/ResponseService";

const getAllEmailsController: RequestHandler = async (req, res) => {
  try {
    const emails = await EmailsModel.paginate(
      {},
      {
        page: Number(req.query.page ?? 1),
        limit: Number(req.query.limit ?? 8),
      }
    );
    ResponseService.success(res, emails);
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};

export default getAllEmailsController;
