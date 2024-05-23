import { RequestHandler } from "express";
import PostModel from "../../models/Posts/PostModel";
import ResponseService from "../../services/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const GetPostByUrlController: RequestHandler = async (req, res, next) => {
  const postUrl = req.params.url;

  try {
    const post = await PostModel.findOne({ url: postUrl }).populate("similarArticles");

    if (!post) {
      return ResponseService.error(next, TEXT.ERRORS.postDoesntExists);
    }

    ResponseService.success(res, post);
  } catch (error: any) {
    ResponseService.error(next, error.message);
  }
};

export default GetPostByUrlController;
