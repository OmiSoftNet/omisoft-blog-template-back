import { RequestHandler } from "express";
import PostModel from "../../models/Posts/PostModel";
import ResponseService from "../../services/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const GetAllPostAdminController: RequestHandler = async (req, res, next) => {
  try {
    const posts = await PostModel.paginate(
      {},
      {
        page: Number(req.query.page ?? 1),
        limit: Number(req.query.limit ?? 8),
        sort: "-createdAt",
      }
    );

    if (!posts) {
      return ResponseService.error(next, TEXT.ERRORS.postDoesntExists);
    }
    ResponseService.success(res, posts);
  } catch (error: any) {
    ResponseService.error(next, error.message);
  }
};

export default GetAllPostAdminController;
