import { RequestHandler } from "express";
import PostModel from "../../models/Posts/Post.model";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const getAllPostAdminController: RequestHandler = async (req, res) => {
  try {
    const posts = await PostModel.paginate(
      {},
      {
        page: Number(req.query.page ?? 1),
        limit: Number(req.query.limit ?? 8),
        select: ["-__v"],
        sort: "-createdAt",
      }
    );

    if (!posts) {
      return ResponseService.error(res, TEXT.ERRORS.postDoesntExists);
    }
    ResponseService.success(res, posts);
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};

export default getAllPostAdminController;
